import type { Metadata } from "next";
import { ContactPreview } from "@/components/ContactPreview";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Historia } from "@/components/Historia";
import { MediaSection } from "@/components/MediaSection";
import { Repertorio } from "@/components/Repertorio";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { ZamoraMapPreview } from "@/components/ZamoraMapPreview";
import { getDisplayEvents } from "@/lib/events";
import { siteConfig } from "@/lib/mock-data";

export const revalidate = 300;

export const metadata: Metadata = {
  title: {
    absolute: "Charanga Malavida | Charanga en Zamora y Castilla y León"
  },
  description:
    "Música en directo para fiestas populares, pasacalles, bodas y eventos. Charanga Malavida actúa en Zamora, Castilla y León y alrededores.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Charanga Malavida | Charanga en Zamora y Castilla y León",
    description:
      "Música en directo para fiestas populares, pasacalles, bodas y eventos en Zamora, Castilla y León y alrededores.",
    url: "https://charangamalavida.es",
    images: [
      {
        url: "/logo/logo.png",
        width: 1600,
        height: 1600,
        alt: "Logo de Charanga Malavida"
      }
    ]
  }
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo/logo.png`,
  areaServed: ["Zamora", "Castilla y León"],
  sameAs: siteConfig.social.map((item) => item.href)
};

export default async function Home() {
  const eventResult = await getDisplayEvents(50);
  const featuredEventResult = {
    ...eventResult,
    events: eventResult.events.slice(0, 3)
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Historia />
        <UpcomingEvents eventResult={featuredEventResult} />
        <ZamoraMapPreview events={eventResult.events} mode={eventResult.mode} />
        <MediaSection />
        <Repertorio />
        <ContactPreview />
      </main>
      <Footer />
    </>
  );
}
