# Investigación profunda para la web de Charanga Malavida

## Conclusión ejecutiva

La opción más sólida para **Malavida** es montar una web con **Next.js + TypeScript + Tailwind CSS + Leaflet + FullCalendar**, desplegada en **Vercel**, y usar **Google Calendar como fuente de verdad de las actuaciones**. Esa combinación encaja especialmente bien con lo que pides: una web vistosa pero no excesivamente compleja, muy responsive, con SEO fuerte, formularios integrados y, sobre todo, con un sistema de actuaciones que puedas actualizar sin tocar código ni volver a subir la web cada vez. Next.js aporta renderizado híbrido, metadatos, `robots.txt`, `sitemap.xml`, handlers de servidor y revalidación; FullCalendar tiene conectores oficiales para React y Vue y puede usar Google Calendar como backend; Leaflet resuelve muy bien mapas provinciales con iconos personalizados y capas GeoJSON; y Google Calendar ya te da la interfaz más cómoda posible para añadir nuevas fechas. citeturn14search4turn28search9turn28search3turn28search1turn15search1turn15search0turn16search0turn3view2turn3view3turn2search9

El duelo real **no es “Vue.js o Next.js”**, sino **“Nuxt o Next.js”**. Vue por sí solo nace como framework de UI del lado cliente; su guía oficial explica que por defecto renderiza y manipula el DOM en el navegador, y remite a SSR y a soluciones de nivel superior como Nuxt cuando buscas renderizado del lado servidor y mejor SEO. Nuxt 4 es hoy una alternativa totalmente válida, con `useSeoMeta`, rendering híbrido y despliegue universal. Aun así, para este proyecto concreto, **Next.js tiene una ligera ventaja** porque te permite concentrar en un único stack la web pública, los endpoints para formularios, la capa de integración con Google Calendar y la generación de metadatos, sitemap y robots, con una documentación especialmente fuerte para ese flujo full‑stack. citeturn32search0turn21search0turn21search1turn21search3turn15search1turn28search10turn28search3turn28search1

También conviene dejar una expectativa clara sobre SEO: **nadie puede garantizar que una web vaya a salir “la primera” para “charanga en Zamora”**. Google dice expresamente que no hay secretos para ponerse primero y que en local no existe ninguna forma de solicitar o pagar un mejor ranking; los resultados dependen sobre todo de relevancia, distancia y prominencia. Lo que sí puedes hacer es construir una base técnica mucho mejor que la de muchos competidores locales y aprovechar que, en los resultados revisados para búsquedas como “charanga Zamora”, siguen dominando directorios y marketplaces, mientras Malavida aparece sobre todo en Instagram y fichas de terceros. Eso significa que hay margen real para ganar visibilidad propia, aunque no exista una garantía honesta de primera posición. citeturn30view3turn30view2turn24search0turn24search1turn24search3turn24search5turn25search0turn25search9

## Qué stack recomiendo y por qué

Mi recomendación principal es esta:

**Frontend y capa web**
- **Next.js con App Router + TypeScript**. Next.js se presenta como framework React full‑stack; además, su documentación oficial cubre de forma nativa metadatos, imágenes, handlers de rutas, caching y revalidación. El flujo oficial de creación del proyecto ya ofrece TypeScript, ESLint, Tailwind CSS y App Router como defaults recomendados. citeturn14search4turn28search10turn15search1turn15search3turn23search7

**Estilos y responsive**
- **Tailwind CSS** para maquetación rápida, responsive y consistente. Para una web de charanga pequeña o mediana, Tailwind reduce mucho el tiempo de implementación sin obligarte a meter un sistema visual complejo; además, su documentación de responsive utilities es muy directa. citeturn0search12turn23search7

**Movimiento y transiciones**
- **Animaciones sutiles con CSS + Intersection Observer**, y si quieres algo más pulido, **Motion** para React. El Intersection Observer es baseline y ampliamente soportado, mientras que las scroll-driven animations CSS siguen marcadas como “limited availability” en MDN; eso hace más seguro basar el “movimiento” principal en observadores o en Motion, no en APIs CSS todavía irregulares. citeturn19search1turn19search6turn19search2turn19search5

**Despliegue**
- **Vercel** es la opción más natural con Next.js, especialmente si vas a iterar con un agente de código. La documentación oficial destaca la integración nativa con Next.js y los preview deployments al conectar el repositorio, algo muy útil para revisar cambios de Codex antes de publicar. citeturn14search12turn14search3

La alternativa seria si prefieres Vue es **Nuxt 4**, no Vue “a secas”. Nuxt aporta `useSeoMeta`, `useServerSeoMeta`, fetching SSR-friendly y rendering híbrido por route rules, así que no estarías renunciando a SEO ni a una buena arquitectura. Si tu equipo ya domina Vue, Nuxt es perfectamente defendible. Pero si el criterio es **“la opción más directa y compatible para que Codex monte una web pública con formularios, mapa, calendario y SEO sin inventar demasiada infraestructura”**, entonces **Next.js sale mejor parado**. citeturn21search1turn21search5turn15search2turn15search5turn21search0turn14search5

Hay una decisión técnica importante aquí: **no te conviene exportar la web como un sitio completamente estático** si quieres formularios del lado servidor y actuaciones que se reflejen sin rebuild manual. Next.js puede hacer static export, pero su soporte es limitado frente a un despliegue Node/serverless. Para tu caso encaja mejor un despliegue en Node o serverless con rutas propias y revalidación. citeturn14search1turn23search9turn15search1turn15search6

## Mapa y calendario sin tener que actualizar la web

La pieza más importante de toda la arquitectura es que **mapa, calendario, listado de próximas actuaciones y páginas de evento lean de la misma fuente de datos**. Si no haces eso, acabarás duplicando fechas, corrigiendo errores en dos sitios y perdiendo tiempo a cada cambio. La forma más cómoda, para un grupo pequeño, es usar **Google Calendar como backoffice de actuaciones**: la API oficial permite listar eventos, el recurso `Event` incluye `summary`, `description`, `location`, `start` y `end`, y Google Calendar puede funcionar como calendario público y como fuente de datos para la web. FullCalendar documenta expresamente que Google Calendar puede actuar como backend que gestiona y persiste eventos. citeturn3view1turn3view0turn31search8turn3view2

La implementación que más sentido tiene para Malavida es esta: cada actuación se crea en un **Google Calendar dedicado de Malavida**; la web tiene un **Route Handler** en Next.js que consulta esos eventos y devuelve un JSON normalizado; **FullCalendar** consume ese JSON para el calendario; y el **mapa Leaflet** consume el mismo JSON para pintar los marcadores. Con eso, al añadir una nueva actuación en Google Calendar, la web la recoge automáticamente sin tocar la interfaz pública. Si quieres casi inmediatez, Google Calendar tiene además **push notifications** con `watch` para cambios en eventos, de modo que en una segunda fase puedes invalidar la caché cuando haya un alta o una modificación en el calendario. citeturn15search1turn15search4turn15search0turn31search0turn31search2

Para el **calendario visual**, la tecnología más adecuada es **FullCalendar**. Tiene conectores oficiales para **React** y **Vue 3**, soporta múltiples vistas, incluida **list view**, y puede usar Google Calendar o feeds JSON. Eso te permite hacer algo muy práctico: **vista mensual en desktop** y **vista tipo lista en móvil**, que suele funcionar mucho mejor en pantallas pequeñas. citeturn16search0turn1search11turn16search2turn16search16turn3view2

Para el **mapa**, la mejor decisión aquí no es MapLibre, ni un GIS complejo, ni Google Maps: es **Leaflet**. Leaflet resuelve de forma limpia lo que necesitas de verdad: un mapa 2D de la provincia, marcadores con icono personalizado, popups, capas GeoJSON y control del viewport. Su documentación cubre explícitamente `Marker`, iconos custom y objetos GeoJSON. MapLibre GL JS es excelente para vector tiles y estilos más ambiciosos, pero para un mapa provincial con logos de la charanga en pueblos, Leaflet es más simple, más rápido de desarrollar y suficiente. citeturn3view3turn3view4

La parte geográfica se resuelve así: usa la capa oficial de **límites municipales/provinciales del CNIG/IGN** para obtener la geometría de Zamora, y un listado de municipios/códigos o geocodificación oficial de **CartoCiudad** para transformar el nombre del pueblo en coordenadas o para precargar un diccionario de municipios zamoranos. CartoCiudad documenta un geocoder oficial y gratuito, con cobertura nacional y capacidad para localizar topónimos, entidades de población y unidades administrativas. Con eso puedes montar un sistema muy cómodo: en cada evento, en el campo `location` de Google Calendar, pones el nombre del municipio; la web lo mapea contra un diccionario de municipios de Zamora; y Leaflet pinta el marcador con el logo de Malavida. citeturn4search1turn6search0turn6search6turn6search11

Hay un detalle de producción importante: **no conviene depender del tile server estándar de OpenStreetMap para una web pública**. La política oficial de uso deja claro que el servicio estándar tiene sus propias restricciones y no es un CDN general para proyectos en producción. Lo correcto es usar Leaflet con un proveedor de tiles adecuado —por ejemplo, un proveedor compatible como MapTiler o similar— o incluso limitar tanto el alcance del mapa que casi todo el peso visual venga del GeoJSON provincial y tus propios marcadores. citeturn4search0turn18search0turn18search11

## SEO realista para competir por charanga en Zamora

La clave para el SEO de esta web no es “meter muchas keywords” sino **hacer que Google entienda claramente quién sois, dónde trabajáis, qué tocáis y qué actuaciones tenéis**, con contenido visible y renderizado correctamente. Google insiste en que no hay atajos para ponerse primero, que el SEO consiste en ayudar a los buscadores a entender el contenido, y que el contenido útil pesa más que los trucos. También recuerda que el bot debe ver la página de forma parecida a como la ve el usuario y que el texto visible importa: Googlebot no entiende el texto “dentro del vídeo” como contenido textual de la página. citeturn30view3turn29search6turn29search0

Con eso en mente, tu arquitectura SEO debería tener al menos estas páginas y objetivos:

La **home** debe atacar la intención principal: “Charanga en Zamora”, “Charanga para fiestas en Zamora”, “Charanga Malavida”. Ahí debes incluir la propuesta de valor, una historia breve, foto, repertorio/arreglos, redes, CTA de contacto, próximas actuaciones y mapa. En esa home hay que implementar **structured data de `Organization`** con `name`, `logo`, `url`, `telephone` y `sameAs` para enlazar Instagram, YouTube, Spotify y cualquier otro perfil relevante. Google documenta que el marcado `Organization` en la home ayuda a entender los detalles administrativos y a desambiguar la organización, y admite `sameAs` para perfiles externos como redes sociales o sitios de reseñas. citeturn30view0

Además, cada actuación importante debería tener su propia URL, por ejemplo **`/actuaciones/[slug]`**. Esto no es solo elegante: **Google exige URLs únicas de evento y recomienda que las páginas del “event experience” se centren en un solo evento**, no en una agenda múltiple. Por tanto, aunque tengas un calendario general en la home, te conviene generar páginas individuales de actuación con título, descripción, fecha, lugar, mapa pequeño y, si procede, vídeo o fotos posteriores. Es una de las decisiones con más retorno SEO de todo el proyecto. citeturn30view1

En lo técnico, Next.js te lo pone fácil para generar **metadata**, `robots.txt` y `sitemap.xml` desde el propio framework. Google, además, documenta que el sitemap puede acelerar el descubrimiento y que la URL del sitemap puede declararse en `robots.txt`. En paralelo, conviene dar de alta la web en **Search Console** desde el primer día para controlar indexación, cobertura y consultas de búsqueda. citeturn28search10turn28search3turn28search1turn11search7turn22search4

Para búsquedas locales, si la actividad encaja en las normas de Google, os interesa revisar la posibilidad de una **Google Business Profile como negocio de área de servicio**. Google explica que los service-area businesses son negocios que visitan directamente al cliente y que los resultados locales dependen sobre todo de relevancia, distancia y prominencia; además, más reseñas y mejores valoraciones pueden ayudar al ranking local. No puedo garantizar que una charanga sea aceptada automáticamente sin ver la casuística exacta, pero sí que el patrón “servicio que se desplaza al cliente” existe en la documentación oficial. citeturn26search8turn26search0turn26search2turn30view2

Sobre el contenido, lo sensato es apuntar a unas pocas landings muy buenas y no a decenas de páginas delgadas. La búsqueda actual en Zamora está ocupada en buena medida por directorios y alguna competencia con web propia, así que una **home potente + páginas de evento + una página específica de contratación/servicios + una página de repertorio o arreglos** ya puede marcar diferencia. También ayuda conseguir enlaces locales y menciones desde el Ayuntamiento, festivales, medios comarcales y perfiles oficiales de fiestas; Google recuerda que otros sitios enlazando a tu contenido es una de las vías naturales por las que descubre páginas nuevas, y que la promoción ayuda a acelerar esa visibilidad. citeturn24search0turn24search1turn25search9turn25search14turn30view3

Hay también tres reglas SEO que te ahorrarían errores frecuentes. La primera: **no montes una SPA cliente pura y luego la “arregles” con dynamic rendering**; Google dice que el dynamic rendering es un workaround y no una solución recomendada. La segunda: **no sobrevalores tener keywords en el dominio**, porque Google explica que el nombre del dominio o el path apenas aportan señal más allá de elementos como breadcrumbs. La tercera: **no hagas keyword stuffing**; Google lo considera una mala experiencia y una práctica contra sus políticas de spam. citeturn29search2turn30view3

## Formularios, redes y avisos a correo, Telegram y WhatsApp

Para el formulario de contacto, la opción más limpia hoy es usar **formularios con Server Actions o Route Handlers en Next.js** y enviar el correo desde servidor mediante un servicio como **Resend**. Next.js documenta expresamente el flujo de formularios con Server Actions, y Resend tiene guía oficial para Next.js. Esto es mejor que un simple `mailto:` porque no depende del cliente de correo del usuario, permite validar campos, mostrar mensajes de éxito y añadir protección anti-spam. citeturn8search1turn8search17turn8search2

Si quieres que el formulario además genere una **notificación interna inmediata**, la ruta más simple es **Telegram**. Telegram documenta que su Bot API es una interfaz HTTP/HTTPS para bots y su guía oficial explica cómo crear el bot con BotFather y conectarlo a tu backend. En la práctica, eso significa que cuando alguien envía el formulario, además del email puedes lanzar un mensaje al chat privado o grupo interno de Malavida con el nombre, teléfono, fecha del evento y mensaje. Para una pequeña organización es mucho más sencillo y ligero de operar que una integración programática completa con WhatsApp. citeturn20search0turn20search4turn20search8

Con **WhatsApp** hay dos niveles. El **nivel fácil** es poner botones de **click-to-chat** usando `wa.me`, algo que WhatsApp documenta oficialmente. Eso resuelve muy bien el “quiero que puedan escribirme por WhatsApp” sin complicar el backend. El **nivel avanzado** es la **WhatsApp Business Platform / Cloud API**, que sí permite automatizaciones más profundas, pero ya entra en el terreno de número de empresa, onboarding y una integración bastante más seria. Para el MVP, mi recomendación es: **email + Telegram interno + botón WhatsApp click-to-chat**. Si más adelante la web genera mucho volumen, entonces sí estudiar la Cloud API. citeturn9search1turn9search2turn8search8turn8search12

Como esta web llevará formularios públicos, conviene añadir una defensa anti-spam sencilla. **Cloudflare Turnstile** es una opción sólida y su documentación explica que protege formularios emitiendo un token en cliente que luego se valida en servidor. Es una capa útil especialmente si el formulario va a exponer email, Telegram o avisos internos. citeturn17search0turn17search1turn17search2

Para redes y media embebida, no necesitas inventar nada raro. **Spotify** tiene documentación oficial para embeds y API de iframe, y **YouTube** tiene su IFrame Player API. Para una web como la vuestra lo lógico es usar embeds sencillos y responsive en secciones bien separadas: uno o dos vídeos representativos y un bloque Spotify de playlist, artista o tema destacado. citeturn10search0turn10search5turn10search8turn10search1turn10search3

## Plan de actuación para Codex

La mejor forma de trabajar con Codex aquí es darle **una especificación cerrada y opinada**, no una petición ambigua. El plan debería ser este:

- **Crear el proyecto con Next.js, TypeScript, ESLint y Tailwind**, usando App Router y dejando claro que el logo actual debe moverse a `public/logo` para servirse como asset estático. Next.js documenta el uso de la carpeta `public` y el propio `create-next-app` ofrece TypeScript, ESLint y Tailwind en el flujo recomendado. citeturn23search1turn23search7
- **Configurar el despliegue en Vercel** con previews por push para revisar cada iteración antes de sacar nada a producción. citeturn14search3turn14search12
- **Definir Google Calendar como base de datos de actuaciones** y construir un endpoint `/api/events` con Route Handler que lea los eventos, normalice fechas y población, y devuelva JSON para el calendario, el mapa y las páginas individuales. citeturn15search1turn3view1turn3view0turn31search8
- **Montar el calendario con FullCalendar**, usando vista lista en móvil y vista mensual en escritorio, consumiendo `/api/events`. citeturn16search0turn16search2turn16search16
- **Montar el mapa con Leaflet**, fijado a la provincia de Zamora, con GeoJSON del CNIG/IGN, marcadores personalizados con el logo de Malavida y popups que enlacen a la página individual de la actuación. citeturn3view3turn4search1
- **Añadir una capa de municipios/centroides de Zamora** y un normalizador de nombres, apoyándose en CartoCiudad para resolver topónimos o en un diccionario precomputado, de modo que al escribir el nombre del pueblo en Google Calendar aparezca el marcador automáticamente. citeturn6search0turn6search6turn6search11
- **Crear las páginas SEO**: home, contratación/servicios, contacto y `/actuaciones/[slug]`; implementar `Organization` en la home y `Event` en cada actuación individual; generar `robots.txt`, `sitemap.xml` y metadata por página. citeturn30view0turn30view1turn28search10turn28search3turn28search1
- **Implementar formulario de contacto** con envío por email vía servidor y notificación opcional por Telegram; añadir botón WhatsApp click-to-chat y protección anti-spam con Turnstile. citeturn8search1turn8search2turn20search0turn9search2turn17search1
- **Aplicar animaciones suaves**, basadas en Intersection Observer o Motion, evitando depender para lo esencial de scroll-driven CSS todavía no baseline. citeturn19search1turn19search6turn19search5
- **Dar de alta Search Console y, si aplica, Business Profile** al lanzar la web, para medir consultas, indexación y presencia local. citeturn22search4turn26search8turn30view2

Este es un brief que puedes pasarle a Codex casi tal cual:

```text
Quiero una web para Charanga Malavida usando Next.js App Router + TypeScript + Tailwind.

Objetivos:
- Web muy responsive, rápida y SEO-friendly.
- Diseño sencillo pero moderno, con pequeñas animaciones al hacer scroll.
- Home con:
  - hero con logo de la charanga
  - historia breve + foto
  - enlaces a redes y contacto
  - bloque de vídeos embebidos
  - bloque Spotify embebido
  - próximas actuaciones
  - mapa de la provincia de Zamora con marcador personalizado usando el logo de la charanga en cada pueblo
  - bloque de arreglos/repertorio
  - formulario de contacto

Fuente de datos:
- Las actuaciones deben salir de Google Calendar.
- Crear un endpoint /api/events que lea Google Calendar y devuelva JSON normalizado.
- El calendario visual, el mapa y las páginas SEO de actuaciones deben leer de esa misma fuente.
- No quiero tener que editar código cuando añada una actuación nueva en Google Calendar.

Mapa:
- Usar Leaflet.
- Cargar la geometría de la provincia/municipios de Zamora desde GeoJSON.
- Crear icono custom con el logo de Malavida.
- Hacer popup con nombre del pueblo, fecha y enlace a la página de la actuación.
- Limitar la vista a Zamora y desactivar comportamientos molestos en móvil.

Calendario:
- Usar FullCalendar.
- En móvil usar vista lista.
- En desktop usar vista mensual.
- Traducir al español.

SEO:
- Implementar metadata por página.
- Crear robots.txt y sitemap.xml.
- Home con JSON-LD Organization.
- Cada actuación con URL propia /actuaciones/[slug] y JSON-LD Event.
- Optimizar títulos, descriptions, Open Graph y alt text.
- Preparar contenido para posicionar “Charanga en Zamora” y similares, sin keyword stuffing.

Formulario:
- Implementar con Server Actions o Route Handler.
- Enviar correo a la cuenta de Malavida.
- Notificar también por Telegram si hay variables de entorno configuradas.
- Añadir botón WhatsApp click-to-chat.
- Proteger con Turnstile.

Media:
- Hacer responsive los embeds de YouTube y Spotify.
- Mantener buen rendimiento.

Estructura:
- Reutilizar el logo existente desde /public/logo.
- Crear componentes claros: Hero, Historia, MediaSection, UpcomingEvents, ZamoraMap, CalendarSection, Repertorio, ContactForm, Footer.
- Preparar AGENTS.md o README interno con arquitectura, variables de entorno y decisiones técnicas.
```

## Preguntas abiertas y límites

Hay cuatro puntos que no impiden arrancar, pero que conviene dejar fijados antes de publicar:

- **Si las actuaciones se van a guardar en un Google Calendar público o privado**. Técnicamente ambas vías son posibles, pero la estrategia de acceso cambia. La API documenta lectura de eventos y el uso de calendarios públicos/embebidos, mientras que OAuth y scopes entran si la lectura no es pública. citeturn3view1turn2search1turn31search7
- **Si queréis solo botón de WhatsApp o una automatización real con WhatsApp Business Platform**. La primera es muy simple; la segunda es bastante más compleja. citeturn9search2turn8search12
- **Si el repertorio/arreglos va a cambiar mucho o poco**. Si cambia poco, puede ir en un archivo local o en contenido estático; si cambia mucho, entonces sí merece entrar en una pequeña edición estructurada, por ejemplo con un CMS como Sanity Studio embebido en Next.js. citeturn7search0turn7search4turn7search11
- **Qué dominios y activos ya tenéis**. Google deja claro que las keywords en el dominio tienen poco impacto por sí solas, así que no hace falta obsesionarse con un exact match; es más importante lanzar una marca clara, con buena arquitectura, enlaces locales y contenido útil. citeturn30view3

En resumen, si quieres una decisión cerrada: **elige Next.js, usa Google Calendar como backend editorial de actuaciones, pinta el mapa con Leaflet sobre datos oficiales de Zamora, genera páginas individuales de evento para SEO, y resuelve contactos con email + Telegram + botón de WhatsApp**. Es la solución más compatible, más razonable de mantener y más alineada con lo que pides hoy. citeturn14search4turn3view2turn3view3turn30view1turn8search2turn20search0turn9search2