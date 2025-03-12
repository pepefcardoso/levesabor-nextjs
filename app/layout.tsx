import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navigation/Navbar";
import Footer from "../components/Navigation/Footer";
import TransitionWrapper from "../components/Others/TransitionWrapper";
import { bgColors } from "../constants/colors";
import clsx from "clsx";

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
      <body className={clsx(bgColors.background, "flex flex-col min-h-screen")}>
        <Navbar />
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
