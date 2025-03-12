"use client";

import { NAV_LINKS, USER_LINKS } from "@/constants/index";
import { AuthService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import routes from "routes/routes";
import useAuthStore from "store/authStore";
import TextButton from "../Buttons/TextButton";
import { FilledButtonHovers, TextButtonHovers } from "@/typings/buttons";
import { bgColors, txtColors } from "@/constants/colors";
import Image from "next/image";
import FilledButton from "../Buttons/FilledButton";
import { Typography } from "@/constants/typography";
import ReactDOM from "react-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAuthStore();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      router.push(routes.auth.login);
      toast.success('Fez logout com sucesso.');
    } catch {
      toast.error('Falha ao fazer logout. Por favor, tente novamente.');
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current?.contains(event.target as Node) || buttonRef.current?.contains(event.target as Node)) {
      return;
    }
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderLinks = (links: typeof NAV_LINKS, mobile = false) => (
    <>
      {links.map((link) => (
        <TextButton
          key={link.key}
          href={link.href}
          text={link.label}
          color={txtColors.white}
          hoverAnimation={TextButtonHovers.scale}
          className={mobile ? "w-full text-left px-4 py-3 hover:bg-green-700" : ""}
          onClick={mobile ? () => setIsMenuOpen(false) : undefined}
        />
      ))}
    </>
  );

  const renderUserMenu = (mobile = false) => (
    <>
      {USER_LINKS.map((link) => (
        <TextButton
          key={link.key}
          href={link.href}
          text={link.label}
          color={txtColors.white}
          hoverAnimation={TextButtonHovers.bold}
          className={mobile ? "w-full text-left px-4 py-3 hover:bg-green-700" : ""}
          onClick={mobile ? () => setIsMenuOpen(false) : undefined}
        />
      ))}
      <TextButton
        text="Sair"
        color={txtColors.white}
        hoverAnimation={TextButtonHovers.bold}
        className={mobile ? "w-full text-left px-4 py-3 hover:bg-green-700" : ""}
        onClick={handleLogout}
      />
    </>
  );

  const UserAvatar = () => (
    <button
      ref={buttonRef}
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="focus:ring-2 focus:ring-white rounded-full transition-transform hover:scale-105"
      aria-label="Abrir menu do usuário"
    >
      {user?.image ? (
        <div className="relative w-[40px] h-[40px] rounded-full hover:ring-2 ring-white">
          <Image src={user.image.url} alt="User profile" width={40} height={40} className="object-cover rounded-full" />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-full bg-white flex-center hover:ring-2 ring-white">
          <span className="text-green-800 font-bold">{user?.name?.charAt(0)}</span>
        </div>
      )}
    </button>
  );

  const AuthButtons = ({ mobile = false }) => (
    <div className={`flex ${mobile ? "flex-col gap-4 w-full items-center" : "gap-4 items-center"}`}>
      <TextButton
        href={routes.auth.login}
        text="Entrar"
        color={txtColors.white}
        hoverAnimation={TextButtonHovers.scale}
        className={mobile ? "w-full text-center" : ""}
      />
      <FilledButton
        href={routes.auth.register}
        text="Cadastrar"
        color={bgColors.secondary}
        hoverAnimation={FilledButtonHovers.opacity}
        className={mobile ? "w-full text-center" : ""}
      />
    </div>
  );

  return (
    <header className={`${bgColors.primary} shadow-lg z-50 relative`}>
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <TextButton href={routes.home} text="LeveSabor" color={txtColors.white} typography={Typography.Title} />

        <div className="hidden lg:flex items-center gap-8">{renderLinks(NAV_LINKS)}</div>

        <div className="hidden lg:flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-3">
              <TextButton
                href={routes.user.profile}
                text={user.name}
                color={txtColors.white}
                hoverAnimation={TextButtonHovers.underline}
                typography={Typography.Link2}
              />
              <UserAvatar />
            </div>
          ) : (
            <AuthButtons />
          )}
        </div>

        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          <div className="relative w-8 h-8">
            <svg
              className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>

            <svg
              className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </button>
      </nav>

      <div
        className={`lg:hidden fixed inset-y-0 left-0 w-64 ${bgColors.primary} shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <TextButton
            href={routes.home}
            text="LeveSabor"
            color={txtColors.white}
            typography={Typography.Title}
          />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-white p-2 rounded-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col py-4 overflow-y-auto">
          <nav className="flex flex-col gap-2">
            {renderLinks(NAV_LINKS, true)}
            {user ? (
              <>
                <div className="px-4 py-3 flex items-center gap-3 border-t border-green-700 mt-4">
                  <UserAvatar />
                  <TextButton
                    href={routes.user.profile}
                    text={user.name}
                    color={txtColors.white}
                    hoverAnimation={TextButtonHovers.underline}
                    typography={Typography.Link2}
                  />
                </div>
                {renderUserMenu(true)}
              </>
            ) : (
              <div className="px-4 mt-4">
                <AuthButtons mobile={true} />
              </div>
            )}
          </nav>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {isDropdownOpen &&
        ReactDOM.createPortal(
          <div
            ref={dropdownRef}
            className="absolute bg-white shadow-xl rounded-lg p-2 min-w-[200px] z-[1000] 
                   border border-gray-100 animate-fade-in"
            style={{
              top: (buttonRef.current?.getBoundingClientRect().bottom || 0) + window.scrollY + 8,
              right: window.innerWidth - (buttonRef.current?.getBoundingClientRect().right || 0),
            }}
          >
            <div className="flex flex-col gap-2">{renderUserMenu()}</div>
          </div>,
          document.body
        )}
    </header>
  );
};

export default Navbar;