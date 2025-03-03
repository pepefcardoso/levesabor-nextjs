"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ReactDOM from "react-dom";
import { NAV_LINKS } from "../../constants";
import useAuthStore from "../../store/authStore";
import { AuthService } from "../../services/authService";
import routes from "../../routes/routes";
import TextButton, { HoverAnimations } from "../Buttons/TextButton";
import FilledButton from "../Buttons/FilledButton";
import CustomImage from "../Others/CustomImage";
import { txtColors } from "../../constants/colors";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAuthStore();
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });

  const calculateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        right: window.innerWidth - rect.right + window.scrollX,
      });
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current?.contains(event.target as Node) ||
      buttonRef.current?.contains(event.target as Node)
    ) return;
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      calculateDropdownPosition();
      window.addEventListener("resize", calculateDropdownPosition);
      return () => window.removeEventListener("resize", calculateDropdownPosition);
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthLoading(!!(token && !user));
  }, [user]);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      router.push(routes.auth.login);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const UserAvatar = () => (
    <button
      ref={buttonRef}
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="focus:ring-2 focus:ring-white rounded-full"
    >
      {user?.image ? (
        <CustomImage
          src={user.image.url}
          alt="User profile"
          width={40}
          height={40}
          className="rounded-full hover:ring-2 ring-white"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-white flex-center hover:ring-2 ring-white">
          <span className="text-green-800 font-bold">{user?.name?.charAt(0)}</span>
        </div>
      )}
    </button>
  );

  const AuthButtons = () => (
    <div className="flex gap-4 items-center">
      <TextButton
        href={routes.auth.login}
        text="Entrar"
        color={txtColors.white}
        hoverAnimation={HoverAnimations.bold}
      />
      <FilledButton
        href={routes.auth.register}
        text="Cadastrar"
        fontColor="text-green-800"
        backgroundColor="white"
        className="hover:opacity-80"
      />
    </div>
  );

  const MobileMenu = () => (
    <div className={`lg:hidden bg-green-700 text-white transition-all duration-300 
      ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
      <ul className="flex flex-col gap-2 w-full text-center py-4">
        {NAV_LINKS.map((link) => (
          <TextButton
            key={link.key}
            href={link.href}
            text={link.label}
            color={txtColors.white}
            hoverAnimation={HoverAnimations.scale}
            onClick={() => setIsMenuOpen(false)}
          />
        ))}
        {user ? (
          <>
            <TextButton
              href={routes.user.profile}
              text="Perfil"
              fontColor="white"
              className="regular-18 py-2"
              onClick={() => setIsMenuOpen(false)}
            />
            <TextButton
              href={routes.user.recipes.index}
              text="Minhas Receitas"
              fontColor="white"
              className="regular-18 py-2"
              onClick={() => setIsMenuOpen(false)}
            />
            <TextButton
              href={routes.user.posts.index}
              text="Meus Posts"
              fontColor="white"
              className="regular-18 py-2"
              onClick={() => setIsMenuOpen(false)}
            />
            <TextButton
              text="Sair"
              fontColor="white"
              className="regular-18 py-2"
              onClick={handleLogout}
            />
          </>
        ) : (
          <AuthButtons />
        )}
      </ul>
    </div>
  );

  return (
    <header className="bg-green-800 shadow-lg z-50">
      <nav className="flex items-center justify-between max-container padding-container py-4">
        <TextButton
          href={routes.home}
          text="LeveSabor"
          fontColor="white"
          className="bold-32"
        />

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <TextButton
              key={link.key}
              href={link.href}
              text={link.label}
              fontColor="white"
              className="regular-18"
            />
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          {authLoading ? (
            <CustomImage
              src="/spinner.svg"
              alt="Loading"
              width={32}
              height={32}
              className="animate-spin"
            />
          ) : user ? (
            <div className="flex items-center gap-3">
              <TextButton
                href={routes.user.profile}
                text={user.name}
                fontColor="white"
                className="hover:underline"
              />
              <UserAvatar />
            </div>
          ) : (
            <AuthButtons />
          )}
        </div>

        <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <CustomImage
            src={isMenuOpen ? "/close.svg" : "/menu.svg"}
            alt="Menu"
            width={32}
            height={32}
            className="invert"
          />
        </button>
      </nav>

      <MobileMenu />

      {isDropdownOpen && ReactDOM.createPortal(
        <div ref={dropdownRef} className="fixed bg-white shadow-lg rounded-md z-[1000]"
          style={{ top: dropdownPosition.top, right: dropdownPosition.right }}>
          <TextButton
            href={routes.user.profile}
            text="Meu perfil"
            fontColor="text-gray-700"
            className="px-4 py-2 hover:bg-gray-100 w-full text-left"
          />
          <TextButton
            href={routes.user.recipes.index}
            text="Minhas Receitas"
            fontColor="text-gray-700"
            className="px-4 py-2 hover:bg-gray-100 w-full text-left"
          />
          <TextButton
            href={routes.user.posts.index}
            text="Meus Posts"
            fontColor="text-gray-700"
            className="px-4 py-2 hover:bg-gray-100 w-full text-left"
          />
          <TextButton
            text="Logout"
            fontColor="text-gray-700"
            className="px-4 py-2 hover:bg-gray-100 w-full text-left"
            onClick={handleLogout}
          />
        </div>,
        document.body
      )}
    </header>
  );
};

export default Navbar;