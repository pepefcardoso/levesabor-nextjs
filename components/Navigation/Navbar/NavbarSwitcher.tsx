"use client";

import { useState } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import Link from "next/link";
import Image from "next/image";
import { Typography } from "@/constants/typography";
import { txtColors, bgColors } from "@/constants/colors";
import clsx from "clsx";
import routes from "@/routes/routes";
import useIsMobile from "../../../hooks/useIsMobile";
import { AuthService } from "@/services/authService";
import toast from "react-hot-toast";
import useUserStore from "@/store/userStore";

const NavbarSwitcher = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUserStore();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      toast.success("Fez logout com sucesso.");
      window.location.href = routes.auth.login;
    } catch {
      toast.error("Falha ao fazer logout. Por favor, tente novamente.");
    }
  };

  return (
    <header className={`${bgColors.primary} shadow-lg z-50 relative`}>
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4 mr-8">
          {isMobile && (
            <button
              className="p-2 text-white cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <div className="relative w-8 h-8">
                {isMenuOpen ? (
                  <Image src="/close.svg" alt="Fechar" width={32} height={32} className="w-full h-full" />
                ) : (
                  <Image src="/menu.svg" alt="Menu" width={32} height={32} className="w-full h-full" />
                )}
              </div>
            </button>
          )}
          <Link href={routes.home} className={clsx(isMobile ? Typography.Headline : Typography.Display, txtColors.white)}>LeveSabor</Link>
        </div>
        {!isMobile && <DesktopNavbar onHandleLogout={handleLogout} user={user} />}
      </nav>
      {isMobile && (
        <>
          <MobileNavbar
            onHandleLogout={handleLogout}
            user={user}
            onClose={() => setIsMenuOpen(false)}
            isOpen={isMenuOpen}
          />
          <div
            className={clsx(
              "fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out z-40",
              isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={() => setIsMenuOpen(false)}
          />
        </>
      )}

    </header>
  );
};

export default NavbarSwitcher;
