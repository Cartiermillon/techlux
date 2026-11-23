import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HomeRootTypography } from "@/components/home-root-typography";
import { SITE_URL } from "@/lib/site";

const fallbackSans = Inter({
  variable: "--font-fallback",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tech'lux | Agence d'aménagement lumière & éclairage extérieur",
    template: "%s | Tech'lux",
  },
  description:
    "Tech'lux accompagne paysagistes, concepteurs lumière et bureaux d'études dans leurs projets d'éclairage extérieur : espaces publics, patrimoine, solaire, smart city. Depuis 2010, plus de 30 ans d'expérience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${fallbackSans.variable} h-full`}>
      <body
        id="top"
        className="min-h-full flex flex-col bg-[#f4f4f1] text-[#0b0b0c]"
      >
        <HomeRootTypography />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
