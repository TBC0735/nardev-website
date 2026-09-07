import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getLocale, getDict } from "@/i18n/server";
import { site, organizationJsonLd } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Nardev — Agence web à Dakar",
    template: "%s · Nardev",
  },
  description: site.descriptionFr,
  keywords: [
    "agence web Dakar",
    "création site internet Sénégal",
    "site vitrine",
    "site dynamique",
    "flyers",
    "visibilité Google",
  ],
  openGraph: {
    type: "website",
    siteName: "Nardev",
    title: "Nardev — Agence web à Dakar",
    description: site.descriptionFr,
    url: site.url,
    locale: "fr_SN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nardev — Agence web à Dakar",
    description: site.descriptionFr,
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = getLocale();
  const dict = getDict();

  return (
    <html lang={locale} className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <Header dict={dict} locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict} />
      </body>
    </html>
  );
}
