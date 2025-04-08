"use client";

import { NAV_LINKS, USER_LINKS } from "@/constants/index";
import { AuthService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import TextButton from "../Buttons/TextButton";
import { bgColors, txtColors } from "@/constants/colors";
import Image from "next/image";
import FilledButton from "../Buttons/FilledButton";
import { Typography } from "@/constants/typography";
import clsx from "clsx";
import routes from "../../routes/routes";
import useUserStore from "@/store/userStore";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useUserStore();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      router.push(routes.auth.login);
      toast.success("Fez logout com sucesso.");
    } catch {
      toast.error("Falha ao fazer logout. Por favor, tente novamente.");
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
          fontColor={txtColors.white}
          className={mobile ? "text-left px-4 py-2" : ""}
          onClick={mobile ? () => setIsMenuOpen(false) : undefined}
        />
      ))}
    </>
  );

  const renderUserMenu = (mobile = false) => (
    <>
      {USER_LINKS.map((link) => (
        <div key={link.key}>
          <TextButton
            href={link.href}
            text={link.label}
            fontColor={mobile ? txtColors.white : txtColors.black}
            typography={Typography.Body}
            className={clsx(mobile ? "w-full text-left" : "border-b border-gray-400 w-full", "px-2 py-1")}
            onClick={mobile ? () => setIsMenuOpen(false) : undefined}
          />
        </div>
      ))}
      <div className="">
        <TextButton
          text="↪ Sair"
          fontColor={mobile ? txtColors.white : txtColors.black}
          className={clsx(mobile ? "w-full text-left" : "", "px-2 py-3")}
          onClick={handleLogout}
        />
      </div>
    </>
  );

  const UserAvatar = () => (
    <button
      ref={buttonRef}
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="focus:ring-2 focus:ring-white rounded-full transition-transform hover:scale-105 cursor-pointer"
      aria-label="Abrir menu do usuário"
    >
      {user?.image ? (
        <div className="relative w-[40px] h-[40px] rounded-full hover:ring-2 ring-white">
          <Image src={user.image.url} alt="User profile" width={40} height={40} className="object-cover rounded-full" />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-full bg-white flex-center hover:ring-2 ring-tertiary shadow-sm">
          <span className={clsx(Typography.Title, "flex items-center justify-center w-full h-full")}>
            {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
          </span>
        </div>
      )}
    </button>
  );

  const AuthButtons = ({ mobile = false }) => (
    <div className={`flex ${mobile ? "flex-col gap-4 w-full items-center" : "gap-4 items-center"}`}>
      <TextButton
        href={routes.auth.login}
        text="Entrar"
        fontColor={txtColors.white}
        className={mobile ? "w-full text-center" : ""}
      />
      <FilledButton
        href={routes.auth.register}
        text="Cadastrar"
        color={bgColors.secondary}
        className={mobile ? "w-full text-center" : ""}
      />
    </div>
  );

  return (
    <header className={`${bgColors.primary} shadow-lg z-50 relative`}>
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <button
              className="p-2 text-white cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <div className="relative w-8 h-8">
                <div
                  className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                    }`}
                >
                  <Image src="/menu.svg" alt="Menu" width={32} height={32} className="w-full h-full" />
                </div>
                <div
                  className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                    }`}
                >
                  <Image src="/close.svg" alt="Fechar" width={32} height={32} className="w-full h-full" />
                </div>
              </div>
            </button>
          </div>
          <Link
            href={routes.home}
            className={clsx(Typography.Headline, txtColors.white, "lg:flex-none")}
          >LeveSabor</Link>
        </div>

        <div className="hidden lg:flex items-center justify-center flex-grow gap-8">{renderLinks(NAV_LINKS)}</div>

        <div className="hidden lg:flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-3 relative">
              <TextButton
                href={routes.user.profile}
                text={user.name}
                fontColor={txtColors.white}
                typography={Typography.Subtitle}
              />
              <UserAvatar />
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full right-0 mt-2 bg-white shadow-xl rounded-lg p-2 min-w-[200px] z-[1000] border border-gray-400 animate-fade-in"
                >
                  {renderUserMenu()}
                </div>
              )}
            </div>
          ) : (
            <AuthButtons />
          )}
        </div>
      </nav>

      <div
        className={`lg:hidden fixed inset-y-0 left-0 w-64 ${bgColors.primary
          } shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <Link
            href={routes.home}
            className={clsx(Typography.Headline, txtColors.white, "lg:flex-none")}
          >LeveSabor</Link>
          <button onClick={() => setIsMenuOpen(false)} className="text-white cursor pointer">
            <Image src="/close.svg" alt="Fechar" width={24} height={24} />
          </button>
        </div>

        <div className="flex flex-col h-[calc(100vh-80px)] justify-between">
          <nav className="flex flex-col gap-2 overflow-y-auto">{renderLinks(NAV_LINKS, true)}</nav>

          <div className="mt-auto py-4">
            {user ? (
              <div className="px-4 py-2 flex flex-col gap-2">
                <div className="flex items-center gap-3 pb-2">
                  <UserAvatar />
                  <TextButton
                    href={routes.user.profile}
                    text={user.name}
                    fontColor={txtColors.white}
                    typography={Typography.Subtitle}
                  />
                </div>
                {renderUserMenu(true)}
              </div>
            ) : (
              <div className="px-4">
                <AuthButtons mobile={true} />
              </div>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMenuOpen(false)} />}
    </header>
  );
};

export default Navbar;
