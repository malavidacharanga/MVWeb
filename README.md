# Charanga Malavida Web

Primera fase de la web de **Charanga Malavida**, creada con Next.js App Router, TypeScript y Tailwind CSS. Esta base esta preparada para evolucionar hacia Google Calendar, Leaflet, FullCalendar y formularios con backend.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run lint
```

La URL local por defecto sera:

```bash
http://localhost:3000
```

## Estructura

- `app/`: App Router de Next.js, home, pagina `/agenda`, metadata y endpoints `/api/events` y `/api/contact`.
- `components/`: bloques de la home.
- `lib/events.ts`: integracion con Google Calendar, normalizacion de eventos y fallback a datos mock.
- `lib/municipality-coordinates.ts`: coordenadas y alias de ubicaciones para el mapa de actuaciones.
- `lib/mock-data.ts`: datos provisionales de actuaciones, redes, arreglos, repertorio y media.
- `public/logo/logo.png`: logo real usado por Header, Hero, Footer y metadata.
- `linea-estilo-malavida.md`: guia visual basada en el logo real, con paleta negro/blanco/rosa, bordes gruesos y lenguaje sticker/cartel.
- `public/images/`: fotos reales usadas por el carrusel de la seccion Media.
- `public/videos/`: videos verticales usados por el carrusel tipo reels de la seccion Media.
- `public/arreglos/`: audios de arreglos mostrados en el carrusel de la seccion Arreglos.
- `public/arreglos/epics/`: capturas de partituras usadas como prueba visual de arreglos.
- `public/data/`: carpeta preparada para GeoJSON, municipios y datos estaticos.

## Componentes creados

- `Header`
- `Hero`
- `Historia`
- `UpcomingEvents`
- `ZamoraMap`
- `ZamoraMapPreview`
- `MediaSection`
- `PhotoCarousel`
- `VideoReelCarousel`
- `ArrangementsCarousel`
- `Repertorio`
- `ContactPreview`
- `Footer`

## Despliegue en Netlify

El proyecto no usa `next export`, porque mas adelante necesitara Route Handlers, formularios y datos desde Google Calendar.

Configuracion prevista:

- Build command: `npm run build`
- Publish directory: `.next`
- Runtime: Next.js gestionado por Netlify/OpenNext

El archivo `netlify.toml` ya deja esos valores preparados.

## Variables de entorno futuras

El archivo real de entorno local es `.env.local` y queda ignorado por Git. Para documentar variables sin secretos, usa `.env.example`.

```bash
GOOGLE_CALENDAR_ID=
GOOGLE_CALENDAR_API_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_WHATSAPP_PHONE=
```

## Agenda

`/api/events` lee el calendario publico configurado en `GOOGLE_CALENDAR_ID`.

Comportamiento actual:

- La home muestra un resumen de 3 proximas actuaciones.
- `/agenda` muestra el calendario completo con hasta 50 actuaciones agrupadas por mes.
- El mapa de la home usa hasta 50 actuaciones y marcadores Leaflet personalizados.
- El mapa resuelve coordenadas primero con `lib/municipality-coordinates.ts`; si una ubicacion no esta en la tabla, intenta geocodificarla con Nominatim/OpenStreetMap desde el servidor y cachea el resultado en memoria.
- Muestra proximas actuaciones si existen.
- Si no hay proximas actuaciones, muestra las ultimas pasadas.
- Si Google Calendar falla o faltan variables de entorno, usa eventos mock como respaldo.
- La home y el mapa consumen la misma fuente normalizada.
- No se muestran descripciones internas de Google Calendar en la interfaz.

## Formulario de contacto

El formulario de la seccion Contacto envia las solicitudes por email con Resend a:

```bash
malavidacharanga@gmail.com
```

Para configurarlo en local:

1. Crea una cuenta en Resend.
2. Genera una API key.
3. Copia `.env.example` a `.env.local`.
4. Configura:

```bash
RESEND_API_KEY=
RESEND_FROM_EMAIL=
```

`RESEND_FROM_EMAIL` debe ser un remitente valido en Resend. En produccion, añade las mismas variables en el panel de entorno de Netlify.

Los botones directos de WhatsApp y email se mantienen como alternativa de contacto.

## SEO tecnico

Next.js genera automaticamente estas rutas de metadata:

- `/sitemap.xml`: incluye la home y `/agenda`.
- `/robots.txt`: permite el rastreo y referencia el sitemap.

La home y la agenda tienen canonical propio. El metadata global permite
`index, follow` para buscadores y Googlebot.

En Google Search Console se debe enviar:

```bash
https://charangamalavida.es/sitemap.xml
```

## Siguientes fases

1. Revisar permisos del calendario para que los eventos publicos muestren titulo, ubicacion y descripcion completos.
2. Ampliar coordenadas de municipios y lugares segun entren nuevas actuaciones.
3. Evolucionar `/agenda` a FullCalendar si hace falta una vista mensual interactiva.
4. Crear paginas individuales `/actuaciones/[slug]`.
5. Añadir proteccion anti-spam al formulario con Turnstile si hace falta.
6. Generar JSON-LD `Event` para las actuaciones cuando existan paginas individuales.
