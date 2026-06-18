# Plan de accion para la web de Charanga Malavida

## Objetivo del proyecto

Crear una web publica, moderna y muy responsive para **Charanga Malavida**, orientada a:

- Presentar la charanga con una identidad visual clara.
- Mejorar el posicionamiento para busquedas como "charanga en Zamora", "charanga para fiestas en Zamora" y "Charanga Malavida".
- Mostrar actuaciones futuras sin tener que editar codigo.
- Incluir calendario, mapa de actuaciones, videos, Spotify, repertorio/arreglos y formulario de contacto.
- Facilitar contrataciones por formulario, email, Telegram interno y WhatsApp.

## Decision tecnica principal

El stack recomendado para construir la web es:

- **Next.js App Router + TypeScript** para una web rapida, SEO-friendly y con endpoints propios.
- **Tailwind CSS** para estilos responsive y consistentes.
- **Vercel** para despliegue, previews y publicacion sencilla.
- **Google Calendar** como fuente de verdad de las actuaciones.
- **FullCalendar** para mostrar agenda y calendario.
- **Leaflet** para el mapa de la provincia de Zamora.
- **Resend o proveedor similar** para envio de correos desde servidor.
- **Telegram Bot API** para notificaciones internas opcionales.
- **WhatsApp click-to-chat** para contacto directo.
- **Cloudflare Turnstile** para proteger formularios contra spam.

La decision clave es no hacer una SPA cliente pura ni una web estatica simple: la web necesita endpoints, integraciones y revalidacion de datos para que las actuaciones se actualicen de forma comoda.

## Fase 1. Definicion funcional y contenido base

### Entregables

- Inventario de activos existentes:
  - Logo.
  - Fotos de la charanga.
  - Videos de YouTube.
  - Enlaces de Spotify.
  - Instagram, YouTube, Spotify y otras redes.
  - Telefono y correo de contacto.
- Texto base para:
  - Home.
  - Historia breve.
  - Servicios/contratacion.
  - Repertorio o arreglos.
  - Contacto.
- Definicion de llamadas a la accion:
  - "Contratar la charanga".
  - "Ver proximas actuaciones".
  - "Escribir por WhatsApp".

### Decisiones pendientes

- Dominio definitivo.
- Email receptor de formularios.
- Numero de WhatsApp publico.
- Redes sociales oficiales.
- Tono visual: mas festivo, mas elegante o mixto.

## Fase 2. Creacion del proyecto

### Entregables

- Crear proyecto con:
  - Next.js.
  - App Router.
  - TypeScript.
  - Tailwind CSS.
  - ESLint.
- Configurar estructura inicial:
  - `app/`
  - `components/`
  - `lib/`
  - `public/`
  - `public/logo/`
  - `public/images/`
  - `public/data/`
- Mover o copiar el logo actual a `public/logo`.
- Crear README tecnico interno con:
  - Arquitectura.
  - Variables de entorno.
  - Comandos de desarrollo.
  - Decisiones tecnicas.

### Componentes previstos

- `Hero`
- `Historia`
- `MediaSection`
- `UpcomingEvents`
- `CalendarSection`
- `ZamoraMap`
- `Repertorio`
- `ContactForm`
- `Footer`

## Fase 3. Diseno visual y primera version de la home

### Objetivo

Construir una primera pantalla real de la web, no una landing generica. La primera impresion debe dejar claro que se trata de **Charanga Malavida**.

### Secciones de la home

- Hero con logo, foto potente o fondo visual real de la charanga.
- CTA principal de contratacion.
- Historia breve.
- Proximas actuaciones.
- Mapa de Zamora.
- Videos embebidos.
- Spotify embebido.
- Repertorio/arreglos.
- Formulario de contacto.
- Footer con redes, contacto y enlaces legales.

### Criterios de diseno

- Web festiva, cercana y profesional.
- Responsive desde el primer momento.
- Animaciones suaves al entrar secciones en pantalla.
- Sin sobrecargar la home con efectos innecesarios.
- Buen contraste, textos legibles y botones claros.

## Fase 4. Sistema de actuaciones con Google Calendar

### Objetivo

Permitir que Malavida anada o cambie actuaciones desde Google Calendar sin tocar codigo.

### Arquitectura

- Crear un Google Calendar dedicado a Malavida.
- Cada actuacion sera un evento del calendario.
- La web leera los eventos desde un endpoint propio:
  - `/api/events`
- El endpoint normalizara:
  - Titulo.
  - Fecha y hora.
  - Lugar.
  - Municipio.
  - Coordenadas.
  - Descripcion.
  - Slug.
  - Estado: futura o pasada.

### Entregables

- Endpoint `/api/events`.
- Normalizador de eventos.
- Datos compartidos para:
  - Listado de proximas actuaciones.
  - Calendario.
  - Mapa.
  - Paginas individuales de actuacion.

### Variables de entorno previstas

- `GOOGLE_CALENDAR_ID`
- `GOOGLE_CALENDAR_API_KEY` o credenciales equivalentes segun calendario publico/privado.

## Fase 5. Calendario visual

### Objetivo

Mostrar las actuaciones de forma clara en desktop y movil.

### Implementacion

- Usar FullCalendar.
- Vista mensual en escritorio.
- Vista lista en movil.
- Idioma espanol.
- Eventos cargados desde `/api/events`.
- Click en una actuacion hacia `/actuaciones/[slug]`.

### Entregables

- Componente `CalendarSection`.
- Estados de carga y error.
- Adaptacion responsive.

## Fase 6. Mapa de actuaciones en Zamora

### Objetivo

Crear un mapa de la provincia de Zamora con marcadores de las actuaciones.

### Implementacion

- Usar Leaflet.
- Limitar el mapa a Zamora.
- Usar GeoJSON para provincia/municipios.
- Crear marcador personalizado con el logo de Malavida.
- Popups con:
  - Nombre del evento.
  - Fecha.
  - Municipio.
  - Enlace a la pagina de actuacion.

### Datos geograficos

- Usar limites oficiales CNIG/IGN o una fuente equivalente fiable.
- Crear un diccionario de municipios de Zamora con coordenadas.
- Resolver nombres de pueblos desde el campo `location` de Google Calendar.

### Entregables

- Componente `ZamoraMap`.
- Archivo de municipios/centroides.
- Marcadores de actuaciones futuras y, si interesa, historico de actuaciones pasadas.

## Fase 7. SEO y paginas clave

### Paginas necesarias

- `/`
- `/contratacion`
- `/contacto`
- `/repertorio`
- `/actuaciones`
- `/actuaciones/[slug]`

### SEO tecnico

- Metadata por pagina.
- Open Graph.
- Alt text en imagenes.
- `robots.txt`.
- `sitemap.xml`.
- JSON-LD `Organization` en la home.
- JSON-LD `Event` en cada actuacion.
- URLs individuales para eventos importantes.

### Enfoque de contenido

El contenido debe posicionar de forma natural para:

- Charanga Malavida.
- Charanga en Zamora.
- Charanga para fiestas en Zamora.
- Charanga para bodas, fiestas populares y eventos.
- Musica en directo en Zamora.

Sin keyword stuffing. El objetivo es que Google entienda claramente quienes sois, donde trabajais y que ofreceis.

## Fase 8. Formulario de contacto y avisos internos

### Objetivo

Facilitar contrataciones y evitar que los mensajes se pierdan.

### Campos recomendados

- Nombre.
- Telefono.
- Email.
- Fecha del evento.
- Localidad.
- Tipo de evento.
- Mensaje.
- Consentimiento de privacidad.

### Implementacion

- Formulario con Server Action o Route Handler.
- Validacion en cliente y servidor.
- Envio de email a Malavida.
- Notificacion opcional por Telegram.
- Boton WhatsApp click-to-chat.
- Proteccion anti-spam con Turnstile.

### Variables de entorno previstas

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `NEXT_PUBLIC_WHATSAPP_PHONE`

## Fase 9. Media: video, Spotify y redes

### Entregables

- Bloque de YouTube responsive.
- Bloque de Spotify responsive.
- Enlaces visibles a redes sociales.
- Preparacion de imagenes optimizadas para Next.js.

### Criterios

- No cargar demasiados embeds a la vez.
- Mantener rendimiento.
- Priorizar uno o dos videos representativos.
- Usar imagenes reales de la charanga siempre que sea posible.

## Fase 10. Despliegue, medicion y lanzamiento

### Despliegue

- Crear repositorio Git.
- Conectar con Vercel.
- Configurar variables de entorno.
- Activar preview deployments.
- Publicar version inicial.

### Medicion

- Dar de alta Google Search Console.
- Enviar sitemap.
- Revisar indexacion.
- Medir consultas reales.
- Valorar Google Business Profile si encaja como negocio de area de servicio.

### Checklist de lanzamiento

- Logo correcto.
- Textos revisados.
- Contacto funcional.
- WhatsApp correcto.
- Formulario probado.
- Telegram probado si se activa.
- Eventos cargan desde Google Calendar.
- Mapa muestra marcadores.
- Calendario responsive.
- Paginas de actuaciones con metadata.
- Sitemap generado.
- Search Console configurado.

## Fase 11. Mejoras posteriores

### Posibles evoluciones

- Historico de actuaciones pasadas con fotos.
- Galeria filtrable.
- Paginas por tipo de evento:
  - Bodas.
  - Fiestas populares.
  - Pasacalles.
  - Eventos privados.
- CMS ligero para editar repertorio y textos.
- Automatizacion avanzada de cache con notificaciones de Google Calendar.
- Integracion avanzada con WhatsApp Business Platform si el volumen lo justifica.
- Blog/noticias para actuaciones destacadas.
- Seccion de prensa o menciones locales.

## Orden recomendado de ejecucion

1. Preparar contenidos y activos minimos.
2. Crear proyecto Next.js con Tailwind.
3. Montar home responsive con datos provisionales.
4. Implementar `/api/events` con Google Calendar.
5. Conectar proximas actuaciones, calendario y mapa al mismo endpoint.
6. Crear paginas individuales de actuaciones.
7. Implementar SEO tecnico.
8. Implementar formulario y notificaciones.
9. Revisar rendimiento, accesibilidad y responsive.
10. Desplegar en Vercel.
11. Configurar Search Console y seguimiento.

## Primer MVP recomendado

Para avanzar rapido, el primer MVP deberia incluir:

- Home completa.
- Logo y fotos reales.
- Proximas actuaciones.
- Calendario basico.
- Mapa de Zamora con marcadores.
- Formulario de contacto.
- WhatsApp.
- SEO base.
- Despliegue en Vercel.

Despues del MVP se pueden pulir integraciones avanzadas como Telegram, Turnstile, paginas de evento completas y datos geograficos oficiales mas refinados.

## Riesgos principales

- No tener suficientes fotos o videos de calidad.
- No definir bien el formato de los eventos en Google Calendar.
- Duplicar datos entre calendario, mapa y paginas.
- Depender de servicios de mapas o tiles sin revisar condiciones de uso.
- Publicar sin Search Console ni sitemap.
- Meter demasiados embeds y empeorar rendimiento.

## Proxima accion recomendada

Empezar creando el proyecto Next.js y una primera home con contenido estatico provisional. En paralelo, preparar el Google Calendar de Malavida y fijar el formato exacto para crear actuaciones:

```text
Titulo: Charanga Malavida en [Municipio]
Ubicacion: [Municipio], Zamora
Descripcion:
- Tipo de evento:
- Organizador:
- Observaciones:
```

Cuando esa base este funcionando, se conecta el endpoint `/api/events` y se sustituye el contenido provisional por datos reales.
