import { unstable_cache } from "next/cache";
import { EventItem, getUpcomingEvents, mockEvents } from "@/lib/mock-data";
import {
  getMunicipalityForPlace,
  resolveCoordinatesForPlace
} from "@/lib/municipality-coordinates";

type EventMode = "upcoming" | "past" | "mock";
type EventSource = "google-calendar" | "mock";

export type DisplayEventsResult = {
  events: EventItem[];
  mode: EventMode;
  source: EventSource;
  message: string;
  fallbackReason?: string;
};

type GoogleCalendarDate = {
  date?: string;
  dateTime?: string;
  timeZone?: string;
};

type GoogleCalendarEvent = {
  id?: string;
  status?: string;
  summary?: string;
  description?: string;
  location?: string;
  start?: GoogleCalendarDate;
  end?: GoogleCalendarDate;
};

type GoogleCalendarResponse = {
  items?: GoogleCalendarEvent[];
  error?: {
    message?: string;
  };
};

const DISPLAY_TIME_ZONE = "Europe/Madrid";
const MAX_DISPLAY_EVENTS = 3;
const MAX_CALENDAR_RESULTS = 50;
const EVENTS_REVALIDATE_SECONDS = 300;

const getCachedCalendarEvents = unstable_cache(
  async (direction: "upcoming" | "past") => {
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;

    if (!calendarId || !apiKey) {
      throw new Error("Faltan GOOGLE_CALENDAR_ID o GOOGLE_CALENDAR_API_KEY.");
    }

    return fetchCalendarEvents({ calendarId, apiKey, direction });
  },
  ["google-calendar-events-v2"],
  { revalidate: EVENTS_REVALIDATE_SECONDS }
);

export async function getDisplayEvents(
  limit = MAX_DISPLAY_EVENTS
): Promise<DisplayEventsResult> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;

  if (!calendarId || !apiKey) {
    return getMockResult(
      "Faltan GOOGLE_CALENDAR_ID o GOOGLE_CALENDAR_API_KEY.",
      limit
    );
  }

  try {
    const upcoming = await getCachedCalendarEvents("upcoming");

    if (upcoming.length > 0) {
      return {
        events: upcoming.slice(0, limit),
        mode: "upcoming",
        source: "google-calendar",
        message: "Eventos futuros cargados desde Google Calendar."
      };
    }

    const past = await getCachedCalendarEvents("past");

    if (past.length > 0) {
      return {
        events: past.slice(0, limit),
        mode: "past",
        source: "google-calendar",
        message:
          "No hay eventos futuros; se muestran las ultimas actuaciones pasadas."
      };
    }

    return getMockResult(
      "Google Calendar no devolvio eventos futuros ni pasados.",
      limit
    );
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Error desconocido.";
    return getMockResult(reason, limit);
  }
}

function getMockResult(
  fallbackReason: string,
  limit = MAX_DISPLAY_EVENTS
): DisplayEventsResult {
  const upcomingMock = getUpcomingEvents();

  return {
    events: (upcomingMock.length > 0 ? upcomingMock : mockEvents).slice(
      0,
      limit
    ),
    mode: "mock",
    source: "mock",
    message: "Se muestran eventos de respaldo.",
    fallbackReason
  };
}

async function fetchCalendarEvents({
  calendarId,
  apiKey,
  direction
}: {
  calendarId: string;
  apiKey: string;
  direction: "upcoming" | "past";
}) {
  const now = new Date();
  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      calendarId
    )}/events`
  );

  url.searchParams.set("key", apiKey);
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("timeZone", DISPLAY_TIME_ZONE);
  url.searchParams.set(
    "maxResults",
    String(MAX_CALENDAR_RESULTS)
  );

  if (direction === "upcoming") {
    const oneYearAhead = new Date(now);
    oneYearAhead.setFullYear(oneYearAhead.getFullYear() + 1);
    url.searchParams.set("timeMin", now.toISOString());
    url.searchParams.set("timeMax", oneYearAhead.toISOString());
  } else {
    const eighteenMonthsAgo = new Date(now);
    eighteenMonthsAgo.setMonth(eighteenMonthsAgo.getMonth() - 18);
    url.searchParams.set("timeMin", eighteenMonthsAgo.toISOString());
    url.searchParams.set("timeMax", now.toISOString());
  }

  const response = await fetch(url, { cache: "no-store" });
  const data = (await response.json()) as GoogleCalendarResponse;

  if (!response.ok) {
    throw new Error(
      data.error?.message ?? `Google Calendar respondio ${response.status}.`
    );
  }

  const events: EventItem[] = [];

  for (const calendarEvent of data.items ?? []) {
    if (calendarEvent.status === "cancelled") {
      continue;
    }

    const normalizedEvent = await normalizeGoogleEvent(calendarEvent);

    if (normalizedEvent) {
      events.push(normalizedEvent);
    }
  }

  return direction === "past"
    ? events.sort(sortByDateDescending)
    : events.sort(sortByDateAscending);
}

async function normalizeGoogleEvent(
  event: GoogleCalendarEvent
): Promise<EventItem | null> {
  if (!event.start) {
    return null;
  }

  const date = getStartDate(event.start);
  const location = cleanText(event.location) || "Zamora";
  const rawTitle = cleanText(event.summary);
  const municipality = getMunicipalityForPlace(location, rawTitle);
  const title =
    rawTitle && rawTitle.toLowerCase() !== "busy"
      ? rawTitle
      : `Charanga Malavida en ${municipality}`;
  const descriptionText = cleanText(stripHtml(event.description));
  const type = getEventType(descriptionText);
  const coordinates = await resolveCoordinatesForPlace({
    location,
    municipality,
    title: rawTitle
  });

  return {
    slug: getSlug(title, date, event.id),
    title,
    date,
    time: getDisplayTime(event.start),
    municipality,
    location,
    type,
    description: "",
    coordinates
  };
}

function getStartDate(start: GoogleCalendarDate) {
  if (start.dateTime) {
    return start.dateTime;
  }

  if (start.date) {
    return `${start.date}T00:00:00+02:00`;
  }

  return new Date().toISOString();
}

function getDisplayTime(start: GoogleCalendarDate) {
  if (start.date) {
    return "Todo el dia";
  }

  if (!start.dateTime) {
    return "Hora por confirmar";
  }

  return new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: DISPLAY_TIME_ZONE
  }).format(new Date(start.dateTime));
}

function getEventType(description: string) {
  const match = description.match(/tipo de evento\s*:\s*([^\n\r]+)/i);
  return cleanText(match?.[1]) || "Actuacion";
}

function getSlug(title: string, date: string, id?: string) {
  const day = date.slice(0, 10);
  const base = `${title}-${day}`;
  return slugify(base) || id || `evento-${day}`;
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanText(value?: string) {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

function stripHtml(value?: string) {
  return (value ?? "").replace(/<[^>]*>/g, " ");
}

function sortByDateAscending(a: EventItem, b: EventItem) {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}

function sortByDateDescending(a: EventItem, b: EventItem) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}
