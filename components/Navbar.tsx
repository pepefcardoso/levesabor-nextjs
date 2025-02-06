"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { NAV_LINKS } from "../constants";
import useAuthStore from "../store/authStore";
import { AuthService } from "../services/authService";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthStore();
  const router = useRouter();

  // Determine if we're still checking for the authenticated user.
  // For example, if there's an auth token in localStorage but no user in state,
  // assume we're still loading.
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    // If there's a token but no user info, simulate a loading period.
    if (token && !user) {
      setTimeout(() => {
        setAuthLoading(false);
      }, 500); // Adjust delay as needed
    } else {
      setAuthLoading(false);
    }
  }, [user]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="bg-green-800 drop-shadow-lg">
      <nav className="flex items-center justify-between max-container padding-container relative z-30 py-4">
        {/* Logo */}
        <Link href="/" className="bold-32 text-white cursor-pointer">
          LeveSabor
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.key}
              className="regular-18 text-white cursor-pointer transition-all hover:font-bold"
            >
              {link.label}
            </Link>
          ))}
        </ul>

        {/* Right Section - Auth Status */}
        <div className="hidden lg:flex items-center gap-6">
          {authLoading ? (
            <Image
              src="/spinner.svg"
              alt="spinner"
              width={32}
              height={32}
              className="text-white animate-spin"
            />
          ) : user ? (
            <>
              <div className="flex items-center gap-3">
                <Link
                  href="/userprofile"
                  className="flex items-center gap-2 hover:underline"
                >
                  <span className="text-white">Bem vindo, {user.name}</span>
                  {user.image ? (
                    <Image
                      src={user.image?.url}
                      alt="User profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <span className="text-green-800 font-bold">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </Link>
              </div>
              {/* Logout icon button */}
              <button onClick={handleLogout} className="hover:font-bold">
                <Image
                  src="/logout.svg"
                  alt="Logout"
                  width={24}
                  height={24}
                  className="invert"
                />
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-white hover:font-bold whitespace-nowrap"
            >
              Entrar ou cadastrar-se
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Image
            src={isMenuOpen ? "/close.svg" : "/menu.svg"}
            alt="menu"
            width={32}
            height={32}
            onClick={toggleMenu}
            className="cursor-pointer"
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-300 ease-in-out transform bg-green-700 text-white lg:hidden`}
      >
        <ul className="flex flex-col gap-2 w-full text-center mt-2 pb-4">
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.key}
              className="regular-18 cursor-pointer transition-all hover:font-bold py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {authLoading ? (
            <li className="py-2 flex justify-center">
              <Image
                src="/spinner.svg"
                alt="spinner"
                width={32}
                height={32}
                className="text-white animate-spin"
              />
            </li>
          ) : user ? (
            <>
              <Link
                href="/userprofile"
                className="regular-18 cursor-pointer transition-all hover:font-bold py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Perfil
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="regular-18 cursor-pointer transition-all hover:font-bold py-2"
              >
                <div className="flex items-center justify-center gap-2">
                  <Image
                    src="/logout.svg"
                    alt="Logout"
                    width={24}
                    height={24}
                    className="invert"
                  />
                  <span>Sair</span>
                </div>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="regular-18 cursor-pointer transition-all hover:font-bold py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Entrar
              </Link>
              <Link
                href="/registrar"
                className="regular-18 cursor-pointer transition-all hover:font-bold py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Cadastrar-se
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
