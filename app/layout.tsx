import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://charangamalavida.es"),
  title: {
    default: "Charanga Malavida | Charanga en Zamora",
    template: "%s | Charanga Malavida"
  },
  description:
    "Charanga Malavida lleva música en directo, pasacalles y ambiente festivo a fiestas, bodas y eventos en Zamora.",
  openGraph: {
    title: "Charanga Malavida",
    description:
      "Charanga en Zamora para fiestas populares, bodas, pasacalles y eventos con música en directo.",
    url: "https://charangamalavida.es",
    siteName: "Charanga Malavida",
    images: [
      {
        url: "/logo/logo.png",
        width: 1600,
        height: 1600,
        alt: "Logo de Charanga Malavida"
      }
    ],
    locale: "es_ES",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
