import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navigation/Navbar";
import Footer from "../components/Navigation/Footer";

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
        <main className="flex-1 min-h-[85vh]">
          <Toaster position="bottom-center" />
          <div className="container mx-auto  h-full">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
