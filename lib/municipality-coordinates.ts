import municipiosData from "@/lib/registro-de-municipios-de-castilla-y-leon.json";

export type Coordinates = {
  lat: number;
  lng: number;
};

export const DEFAULT_COORDINATES: Coordinates = {
  lat: 41.5035,
  lng: -5.7446
};

type NominatimResult = {
  lat?: string;
  lon?: string;
};

const NOMINATIM_ENDPOINT = "https://nominatim.openstreetmap.org/search";
const NOMINATIM_USER_AGENT =
  "charanga-malavida-web/1.0 (https://charangamalavida.es)";
const NOMINATIM_MIN_INTERVAL_MS = 1100;

const geocodingCache = new Map<string, Coordinates | null>();
let nextNominatimRequestAt = 0;

const municipiosIndex = new Map<string, Coordinates>(
  (municipiosData as Array<{ municipio: string; latitud: number; longitud: number }>)
    .filter(m => Number.isFinite(m.latitud) && Number.isFinite(m.longitud))
    .map(m => [
      normalizePlaceKey(m.municipio),
      { lat: m.latitud, lng: m.longitud }
    ])
);

const placeCoordinates: Record<string, Coordinates> = {
  zamora: { lat: 41.5035, lng: -5.7446 },
  "parking-marina-espanola": { lat: 41.5035, lng: -5.7446 },
  "parking-marina-espanola-telpark": { lat: 41.5035, lng: -5.7446 },
  "plaza-de-la-marina-espanola": { lat: 41.5035, lng: -5.7446 },
  "san-pedro-zamora": { lat: 41.5035, lng: -5.7446 },
  almaraz: { lat: 41.47409994, lng: -5.91566795 },
  "almaraz-de-duero": { lat: 41.47409994, lng: -5.91566795 },
  toro: { lat: 41.5242, lng: -5.3953 },
  benavente: { lat: 42.0034, lng: -5.6784 },
  "melgar-de-tera": { lat: 41.96624021, lng: -6.01416339 },
  murias: { lat: 42.141172, lng: -6.664146 },
  "murias-de-sanabria": { lat: 42.141172, lng: -6.664146 },
  donado: { lat: 42.1255288, lng: -6.3607285 },
  "muelas-de-los-caballeros": { lat: 42.12843, lng: -6.33719 },
  mayalde: { lat: 41.251111, lng: -5.7975 },
  cional: { lat: 41.95831667, lng: -6.33776667 },
  fermoselle: { lat: 41.3175, lng: -6.395 },
  "riego-del-camino": { lat: 41.7612, lng: -5.76767 },
  tordesillas: { lat: 41.50027778, lng: -5.00027778 }
};

const placeMunicipalities: Record<string, string> = {
  "parking-marina-espanola": "Zamora",
  "parking-marina-espanola-telpark": "Zamora",
  "plaza-de-la-marina-espanola": "Zamora",
  "san-pedro-zamora": "Zamora",
  "faroles-tordesillas": "Tordesillas",
  "plaza-mayor-tordesillas": "Tordesillas"
};

export function getCoordinatesForPlace(...places: string[]) {
  return getKnownCoordinatesForPlace(...places) ?? DEFAULT_COORDINATES;
}

export function getKnownCoordinatesForPlace(...places: string[]) {
  for (const place of places) {
    const key = normalizePlaceKey(place);

    if (key && placeCoordinates[key]) {
      return placeCoordinates[key];
    }
  }

  return null;
}

function getCoordinatesFromMunicipiosJson(...places: string[]): Coordinates | null {
  for (const place of places) {
    const key = normalizePlaceKey(place);

    if (key) {
      const coords = municipiosIndex.get(key);

      if (coords) {
        return coords;
      }
    }
  }

  return null;
}

export async function resolveCoordinatesForPlace({
  location,
  municipality,
  title
}: {
  location: string;
  municipality: string;
  title?: string;
}) {
  const jsonCoordinates = getCoordinatesFromMunicipiosJson(
    location,
    municipality,
    title ?? ""
  );

  if (jsonCoordinates) {
    return jsonCoordinates;
  }

  const knownCoordinates = getKnownCoordinatesForPlace(
    location,
    municipality,
    title ?? ""
  );

  if (knownCoordinates) {
    return knownCoordinates;
  }

  const queries = getGeocodingQueries(location, municipality, title);

  for (const query of queries) {
    const coordinates = await geocodeWithNominatim(query);

    if (coordinates) {
      return coordinates;
    }
  }

  return DEFAULT_COORDINATES;
}

export function getMunicipalityForPlace(location: string, title?: string) {
  const firstLocationPart = location.split(",")[0] ?? location;
  const candidates = [firstLocationPart, location, title ?? ""];

  for (const candidate of candidates) {
    const key = normalizePlaceKey(candidate);

    if (key && placeMunicipalities[key]) {
      return placeMunicipalities[key];
    }
  }

  return cleanPlaceName(firstLocationPart).replace(/\s+zamora$/i, "") || "Zamora";
}

function getGeocodingQueries(location: string, municipality: string, title?: string) {
  const cleanLocation = cleanPlaceName(location);
  const cleanMunicipality = cleanPlaceName(municipality);
  const cleanTitle = cleanPlaceName(title ?? "");
  const queries = [
    cleanLocation && cleanMunicipality && cleanLocation !== cleanMunicipality
      ? `${cleanLocation}, ${cleanMunicipality}, Castilla y Leon, Espana`
      : "",
    cleanLocation ? `${cleanLocation}, Castilla y Leon, Espana` : "",
    cleanMunicipality ? `${cleanMunicipality}, Castilla y Leon, Espana` : "",
    cleanTitle ? `${cleanTitle}, Castilla y Leon, Espana` : ""
  ];

  return Array.from(new Set(queries.filter(Boolean)));
}

async function geocodeWithNominatim(query: string) {
  const cacheKey = normalizePlaceKey(query);

  if (geocodingCache.has(cacheKey)) {
    return geocodingCache.get(cacheKey) ?? null;
  }

  await waitForNominatimTurn();

  const url = new URL(NOMINATIM_ENDPOINT);
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("addressdetails", "0");

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Accept-Language": "es",
        Referer: "https://charangamalavida.es",
        "User-Agent": NOMINATIM_USER_AGENT
      },
      next: { revalidate: 60 * 60 * 24 * 30 }
    });

    if (!response.ok) {
      geocodingCache.set(cacheKey, null);
      return null;
    }

    const data = (await response.json()) as NominatimResult[];
    const firstResult = data[0];
    const lat = Number(firstResult?.lat);
    const lng = Number(firstResult?.lon);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      geocodingCache.set(cacheKey, null);
      return null;
    }

    const coordinates = { lat, lng };
    geocodingCache.set(cacheKey, coordinates);
    return coordinates;
  } catch {
    geocodingCache.set(cacheKey, null);
    return null;
  }
}

async function waitForNominatimTurn() {
  const now = Date.now();
  const waitMs = Math.max(0, nextNominatimRequestAt - now);
  nextNominatimRequestAt = Math.max(now, nextNominatimRequestAt) + NOMINATIM_MIN_INTERVAL_MS;

  if (waitMs > 0) {
    await new Promise<void>((resolve) => setTimeout(resolve, waitMs));
  }
}

function normalizePlaceKey(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanPlaceName(value: string) {
  return value.replace(/\s+/g, " ").trim();
}
