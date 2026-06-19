export type EventItem = {
  slug: string;
  title: string;
  date: string;
  time: string;
  municipality: string;
  location: string;
  type: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

export const siteConfig = {
  name: "Charanga Malavida",
  url: "https://charangamalavida.es",
  contact: {
    email: "malavidacharanga@gmail.com",
    whatsappHref: "https://wa.me/34608582200"
  },
  social: [
    { label: "Instagram", href: "https://instagram.com/charangamalavida" },
    { label: "TikTok", href: "https://www.tiktok.com/@charangamalavida" },
    { label: "YouTube", href: "https://youtube.com/@charangamalavida" },
    { label: "Spotify", href: "https://open.spotify.com/" }
  ]
};

export const mockEvents: EventItem[] = [
  {
    slug: "fiestas-zamora-2026",
    title: "Fiestas de verano",
    date: "2026-06-21T20:30:00+02:00",
    time: "20:30",
    municipality: "Zamora",
    location: "Zamora, Zamora",
    type: "Fiesta popular",
    description:
      "Pasacalles y repertorio festivo para arrancar la noche con ambiente de calle.",
    coordinates: { lat: 41.5035, lng: -5.7446 }
  },
  {
    slug: "vermú-toro-2026",
    title: "Vermú musical",
    date: "2026-07-05T13:00:00+02:00",
    time: "13:00",
    municipality: "Toro",
    location: "Toro, Zamora",
    type: "Vermú",
    description:
      "Formato cercano para plazas, terrazas y sobremesas que se alargan.",
    coordinates: { lat: 41.5242, lng: -5.3953 }
  },
  {
    slug: "pasacalles-benavente-2026",
    title: "Pasacalles de peñas",
    date: "2026-08-16T19:00:00+02:00",
    time: "19:00",
    municipality: "Benavente",
    location: "Benavente, Zamora",
    type: "Pasacalles",
    description:
      "Recorrido musical para acompañar peñas, cuadrillas y ambiente de fiesta.",
    coordinates: { lat: 42.0034, lng: -5.6784 }
  }
];

export function getUpcomingEvents() {
  return mockEvents
    .filter((event) => new Date(event.date).getTime() >= Date.now())
    .sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
}

export const mediaItems = {
  video: {
    title: "Directo de Charanga Malavida",
    description:
      "Ritmo de calle, canciones reconocibles y ambiente de fiesta para abrir boca antes de vernos en directo."
  },
  spotify: {
    title: "Set festivo",
    description:
      "Una guía sonora con los estilos que mejor funcionan cuando la fiesta empieza a moverse.",
    tracks: ["Pasacalles", "Verbena", "Clásicos de charanga"]
  }
};

export const photoCarouselItems = [
  {
    src: "/images/1.jpg",
    alt: "Charanga Malavida actuando en directo durante una fiesta"
  },
  {
    src: "/images/2.jpg",
    alt: "Integrantes de Charanga Malavida tocando en una actuación"
  },
  {
    src: "/images/3.jpg",
    alt: "Charanga Malavida animando una fiesta popular"
  },
  {
    src: "/images/4.jpg",
    alt: "Música en directo de Charanga Malavida"
  },
  {
    src: "/images/5.jpg",
    alt: "Ambiente festivo con Charanga Malavida"
  },
  {
    src: "/images/6.jpg",
    alt: "Charanga Malavida en un evento con público"
  },
  {
    src: "/images/7.jpg",
    alt: "Actuación de Charanga Malavida en la calle"
  },
  {
    src: "/images/8.jpg",
    alt: "Charanga Malavida tocando para fiestas y pasacalles"
  },
  {
    src: "/images/9.jpg",
    alt: "Foto de Charanga Malavida durante una actuación"
  }
];

export const videoReelItems = [
  {
    src: "/videos/1.mp4",
    title: "Fiesta Malavida",
    ariaLabel: "Video vertical de Charanga Malavida en una fiesta"
  },
  {
    src: "/videos/2.mp4",
    title: "Directo de calle",
    ariaLabel: "Video vertical de Charanga Malavida tocando en directo"
  },
  {
    src: "/videos/3.mp4",
    title: "Pasacalles",
    ariaLabel: "Video vertical de pasacalles de Charanga Malavida"
  },
  {
    src: "/videos/4.mp4",
    title: "Ambiente de plaza",
    ariaLabel: "Video vertical de Charanga Malavida animando una plaza"
  },
  {
    src: "/videos/5.mp4",
    title: "Bodas y eventos",
    ariaLabel: "Video vertical de Charanga Malavida para bodas y eventos"
  },
  {
    src: "/videos/6.mp4",
    title: "Musica en directo",
    ariaLabel: "Video vertical de musica en directo de Charanga Malavida"
  },
  {
    src: "/videos/7.mp4",
    title: "Ritmo Malavida",
    ariaLabel: "Video vertical con ambiente festivo de Charanga Malavida"
  },
  {
    src: "/videos/8.mp4",
    title: "Charanga en marcha",
    ariaLabel: "Video vertical de Charanga Malavida en movimiento"
  },
  {
    src: "/videos/9.mp4",
    title: "Fiestas populares",
    ariaLabel: "Video vertical de Charanga Malavida en fiestas populares"
  },
  {
    src: "/videos/10.mp4",
    title: "Peñas y calle",
    ariaLabel: "Video vertical de Charanga Malavida con peñas y calle"
  }
];

export type ArrangementItem = {
  title: string;
  audioSrc: string;
  description: string;
};

export const arrangementsContact = {
  phoneLabel: "+34 608 40 93 76",
  whatsappHref: "https://wa.me/34608409376"
};

export const arrangements: ArrangementItem[] = [
  {
    title: "Epics",
    audioSrc: "/arreglos/epics/Epics.mpeg",
    description: "Arreglo preparado para charanga, con audio de referencia."
  },
  {
    title: "La Molleja de Rockemon",
    audioSrc:
      "/arreglos/la%20molleja%20de%20rockemon/La%20Molleja%20de%20Rockemon.mpeg",
    description: "Version para directo pensada para sonar con fuerza en calle."
  },
  {
    title: "No a la guerra",
    audioSrc: "/arreglos/no%20a%20la%20guerra/no%20a%20la%20guerra.mpeg",
    description: "Arreglo con estructura lista para ensayo y actuacion."
  },
  {
    title: "Verbena Heroína",
    audioSrc: "/arreglos/verbena/Verbena%20(mp3cut.net).mp3",
    description: "Arreglo festivo para repertorio de verbena y pasacalles."
  }
];

export const scorePreviewImages = [
  {
    src: "/arreglos/epics/1.png",
    alt: "Captura de una partitura de arreglo para Charanga Malavida"
  },
  {
    src: "/arreglos/epics/2.png",
    alt: "Detalle de una segunda captura de partitura de arreglo"
  }
];

export const repertorio = [
  {
    title: "Fiesta popular",
    description:
      "Temas reconocibles para plazas, peñas y momentos de mucha participación.",
    examples: ["Pasodobles", "Rumbas", "Pop festivo"]
  },
  {
    title: "Eventos privados",
    description:
      "Adaptación del repertorio para bodas, cumpleaños y celebraciones cerradas.",
    examples: ["Entrada musical", "Momentos sorpresa", "Final de fiesta"]
  },
  {
    title: "Calle y movimiento",
    description:
      "Arreglos pensados para sonar bien caminando, girando y llegando a cada rincón.",
    examples: ["Pasacalles", "Peñas", "Vermú musical"]
  }
];
