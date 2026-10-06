import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Motion";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Goyals Group | Residential, Commercial & Hospitality Developments in Indore",
    template: "%s | Goyals Group, Indore",
  },
  description:
    "Goyals Group has built across Indore since 1984: 50+ real estate developments spanning residential, commercial and hospitality. Explore properties and projects, or speak with our team.",
  applicationName: site.name,
  keywords: [
    "property in Indore",
    "real estate developer Indore",
    "residential projects in Indore",
    "commercial property in Indore",
    "flats in Indore",
    "new projects in Indore",
    "Goyals Group",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Goyals Group: We build what lasts. Residential, commercial and hospitality in Indore since 1984." }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  alternates: { canonical: "/" },
  robots: site.live ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#12213d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <head>
        <link rel="preload" href="/fonts/plex-sans.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body id="top">
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Reveal />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
