import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tyson Cofre - Consultor Imobiliário RE/MAX | Almada e Lisboa",
  description: "Consultor imobiliário RE/MAX na região de Almada e Lisboa. Encontre o imóvel dos seus sonhos com Tyson Cofre. Apartamentos, moradias e muito mais.",
  keywords: "imobiliário, realtor, almada, lisboa, comprar casa, arrendar, tyson cofre, remax",
  openGraph: {
    title: "Tyson Cofre - Consultor Imobiliário RE/MAX",
    description: "Consultor imobiliário RE/MAX na região de Almada e Lisboa",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${playfair.variable} ${lato.variable} font-sans antialiased`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
