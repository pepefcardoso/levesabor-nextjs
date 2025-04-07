import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navigation/Navbar";
import Footer from "../components/Navigation/Footer";
import TransitionWrapper from "../components/Others/TransitionWrapper";
import { bgColors } from "../constants/colors";
import clsx from "clsx";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LeveSabor - Culinária Inclusiva e Saudável",
  description: "Descubra receitas deliciosas e inclusivas para todas as dietas! Veganas, sem glúten e muito mais.",
  keywords: "receitas saudáveis, culinária inclusiva, sem glúten, vegano, alimentação saudável",
  authors: [{ name: "LeveSabor", url: "https://levesabor.com" }],
  openGraph: {
    type: "website",
    url: "https://levesabor.com",
    title: "LeveSabor - Culinária Inclusiva e Saudável",
    description: "Descubra receitas deliciosas e inclusivas para todas as dietas!",
    images: [
      {
        url: "https://levesabor.com/placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "LeveSabor - Culinária Inclusiva",
      },
    ],
    siteName: "LeveSabor",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={clsx(bgColors.background, inter.variable, "flex flex-col min-h-screen")}>          <Navbar />
        <main className="flex-1">
          <Toaster position="bottom-left" />
          <div className="container mx-auto h-full">
            <TransitionWrapper>{children}</TransitionWrapper>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
