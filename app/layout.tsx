import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "LeveSabor",
  description: "Culinária Inclusiva",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 min-h-[85vh] py-8">
          <Toaster position="bottom-center" />
          <div className="container mx-auto px-4 h-full">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
