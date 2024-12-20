"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import IconButton from "./IconButton";
import { NAV_LINKS } from "../Constants";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

        {/* Social Icons - visible on large screens */}
        <div className="hidden lg:flex gap-4">
          <IconButton icon="/facebook-icon.svg" />
          <IconButton icon="/instagram-icon.svg" />
          <IconButton icon="/whatsapp-icon.svg" />
        </div>

        {/* Menu Button for smaller screens */}
        <div className="lg:hidden">
          <Image
            src={isMenuOpen ? "/close.svg" : "/menu.svg"} // Change icon based on menu state
            alt="menu"
            width={32}
            height={32}
            onClick={toggleMenu}
            className="cursor-pointer"
          />
        </div>
      </nav>

      {/* Mobile Menu with Slide-In/Out Animation */}
      <div
        className={`${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-300 ease-in-out transform bg-green-700 text-white lg:hidden`}
      >
        <ul className="flex flex-col gap-2 w-full text-center mt-2">
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.key}
              className="regular-18 cursor-pointer transition-all hover:font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </ul>
        <div className="flex gap-4 mt-2 justify-center"> {/* Reduced margin */}
          <IconButton icon="/facebook-icon.svg" />
          <IconButton icon="/instagram-icon.svg" />
          <IconButton icon="/whatsapp-icon.svg" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
