"use client";

import { useEffect, useMemo, useRef } from "react";
import type { DivIcon, Map as LeafletMap } from "leaflet";
import type { DisplayEventsResult } from "@/lib/events";

type ZamoraMapProps = {
  events: DisplayEventsResult["events"];
};

type EventGroup = {
  key: string;
  lat: number;
  lng: number;
  location: string;
  events: DisplayEventsResult["events"];
};

const ZAMORA_CENTER: [number, number] = [41.75, -5.8];

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "short",
  timeZone: "Europe/Madrid"
});

export function ZamoraMap({ events }: ZamoraMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const groups = useMemo(() => groupEventsByCoordinates(events), [events]);

  useEffect(() => {
    let cancelled = false;
    let localMap: LeafletMap | null = null;

    async function initMap() {
      const L = await import("leaflet");

      if (!containerRef.current || cancelled) {
        return;
      }

      const map = L.map(containerRef.current, {
        center: ZAMORA_CENTER,
        zoom: 9,
        minZoom: 7,
        maxZoom: 16,
        scrollWheelZoom: false,
        zoomControl: false
      });

      localMap = map;
      mapRef.current = map;

      L.control.zoom({ position: "bottomright" }).addTo(map);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19
        }
      ).addTo(map);

      const markerIcon = createMarkerIcon(L);

      groups.forEach((group) => {
        const marker = L.marker([group.lat, group.lng], {
          icon: markerIcon(group.events.length),
          title:
            group.events.length === 1
              ? group.events[0].title
              : `${group.events.length} actuaciones en ${group.location}`
        });

        marker
          .bindPopup(buildPopupHtml(group), {
            className: "mv-map-popup",
            maxWidth: 290,
            minWidth: 220
          })
          .addTo(map);
      });

      window.setTimeout(() => map.invalidateSize(), 120);
    }

    initMap();

    return () => {
      cancelled = true;

      if (localMap) {
        localMap.remove();
      }

      if (mapRef.current === localMap) {
        mapRef.current = null;
      }
    };
  }, [groups]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        aria-label="Mapa de actuaciones de Charanga Malavida en Zamora"
        className="h-[390px] min-h-[340px] w-full bg-[var(--mv-paper)] sm:h-[480px] lg:h-[560px]"
        role="img"
      />

      <ul className="sr-only">
        {events.map((event) => (
          <li key={event.slug}>
            {event.title}, {dateFormatter.format(new Date(event.date))},{" "}
            {event.time}, {event.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

function createMarkerIcon(L: typeof import("leaflet")) {
  return (count: number): DivIcon =>
    L.divIcon({
      className: "mv-map-marker",
      html: `
        <span class="mv-map-pin">
          <img src="/logo/logo.png" alt="" aria-hidden="true" />
          ${count > 1 ? `<span class="mv-map-pin-count">${count}</span>` : ""}
        </span>
      `,
      iconSize: [58, 66],
      iconAnchor: [29, 62],
      popupAnchor: [0, -58]
    });
}

function groupEventsByCoordinates(events: DisplayEventsResult["events"]) {
  const groups = new Map<string, EventGroup>();

  events.forEach((event) => {
    const key = `${event.coordinates.lat.toFixed(5)}:${event.coordinates.lng.toFixed(
      5
    )}`;
    const existingGroup = groups.get(key);

    if (existingGroup) {
      existingGroup.events.push(event);
      return;
    }

    groups.set(key, {
      key,
      lat: event.coordinates.lat,
      lng: event.coordinates.lng,
      location: event.location,
      events: [event]
    });
  });

  return Array.from(groups.values());
}

function buildPopupHtml(group: EventGroup) {
  const eventsHtml = group.events
    .map((event) => {
      const date = dateFormatter.format(new Date(event.date));

      return `
        <li class="mv-map-popup-event">
          <p class="mv-map-popup-date">${escapeHtml(date)} · ${escapeHtml(
            event.time
          )}</p>
          <h3>${escapeHtml(event.title)}</h3>
          <p class="mv-map-popup-location">${escapeHtml(event.location)}</p>
        </li>
      `;
    })
    .join("");

  return `
    <div class="mv-map-popup-card">
      <ul>${eventsHtml}</ul>
      <a class="mv-map-popup-link" href="/agenda">Ver agenda completa</a>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
