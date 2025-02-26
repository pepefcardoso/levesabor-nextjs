"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ReactDOM from "react-dom";
import { NAV_LINKS } from "../../constants";
import useAuthStore from "../../store/authStore";
import { AuthService } from "../../services/authService";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { user } = useAuthStore();
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    right: number;
  }>({ top: 0, right: 0 });
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(buttonRef.current && buttonRef.current.contains(event.target as Node))
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        right: window.innerWidth - rect.right + window.scrollX,
      });
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      updateDropdownPosition();
      window.addEventListener("resize", updateDropdownPosition);
      window.addEventListener("scroll", updateDropdownPosition, true);
    }
    return () => {
      window.removeEventListener("resize", updateDropdownPosition);
      window.removeEventListener("scroll", updateDropdownPosition, true);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && !user) {
      setTimeout(() => {
        setAuthLoading(false);
      }, 500);
    } else {
      setAuthLoading(false);
    }
  }, [user]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="bg-green-800 drop-shadow-lg z-50">
      <nav className="flex items-center justify-between max-container padding-container relative z-30 py-4">
        <Link href="/" className="bold-32 text-white cursor-pointer">
          LeveSabor
        </Link>

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
                  href="/user/profile"
                  className="flex items-center gap-2 hover:underline"
                >
                  <span className="text-white">{user.name}</span>
                </Link>
                <div className="relative">
                  <button
                    ref={buttonRef}
                    onClick={toggleDropdown}
                    className="focus:outline-none focus:ring-2 focus:ring-white relative z-50"
                  >
                    {user.image ? (
                      <Image
                        src={user.image?.url}
                        alt="User profile"
                        width={40}
                        height={40}
                        className="rounded-full cursor-pointer hover:ring-2 hover:ring-white"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-white">
                        <span className="text-green-800 font-bold">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex gap-4 items-center">
              <Link
                href="/login"
                className="text-white hover:font-bold flex items-center justify-center"
              >
                Entrar
              </Link>
              <Link
                href="/login/register"
                className="bg-white text-green-800 font-semibold px-4 py-2 rounded-md hover:opacity-80 transition mx-auto max-w-max"
              >
                Cadastrar
              </Link>
            </div>
          )}
        </div>

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
                href="/user/profile"
                className="regular-18 cursor-pointer transition-all hover:font-bold py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Perfil
              </Link>
              <Link
                href="/user/recipes"
                className="regular-18 cursor-pointer transition-all hover:font-bold py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Minhas Receitas
              </Link>
              <Link
                href="/user/posts"
                className="regular-18 cursor-pointer transition-all hover:font-bold py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Meus Posts
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
                href="/login/register"
                className="bg-white text-green-800 font-semibold px-4 py-2 rounded-full hover:opacity-80 transition mx-auto w-1/2"
                onClick={() => setIsMenuOpen(false)}
              >
                Cadastrar
              </Link>
            </>
          )}
        </ul>
      </div>

      {hasMounted &&
        ReactDOM.createPortal(
          <div
            ref={dropdownRef}
            className={`fixed w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[1000] ${
              isDropdownOpen ? "block" : "hidden"
            }`}
            style={{ top: dropdownPosition.top, right: dropdownPosition.right }}
          >
            <div className="py-1">
              <Link
                href="/user/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => setIsDropdownOpen(false)}
              >
                Meu perfil
              </Link>
              <Link
                href="/user/recipes"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => setIsDropdownOpen(false)}
              >
                Minhas Receitas
              </Link>
              <Link
                href="/user/posts"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => setIsDropdownOpen(false)}
              >
                Meus Posts
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Navbar;
