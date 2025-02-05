import Link from "next/link";
import React from "react";
import { FOOTER_LINKS } from "../Constants";

const Footer = () => {
  return (
    <footer className="flexCenter mb-2 bg-green-80">
      <div className="flex flex-col w-full">
        <div className="shadow-[0_-4px_8px_-2px_rgba(0,0,0,0.2)]">
          <div className="flex flex-col lg:flex-row items-center justify-between max-container padding-container relative z-30 py-4">
            <Link
              href="/"
              className="bold-32 text-white flexCenter cursor-pointer"
            >
              LeveSabor
            </Link>

            {/* Gap between title and mobile menu options */}
            <div className="lg:hidden mb-5" />

            <ul className="hidden lg:flex h-full gap-12">
              {FOOTER_LINKS.map((link) => (
                <Link
                  href={link.href}
                  key={link.key}
                  className="regular-18 text-white flexCenter cursor-pointer transition-all hover:font-bold"
                >
                  {link.label}
                </Link>
              ))}
            </ul>

            {/* Mobile footer links */}
            <ul className="lg:hidden flex flex-col gap-2 w-full text-center">
              {FOOTER_LINKS.map((link) => (
                <Link
                  href={link.href}
                  key={link.key}
                  className="regular-18 text-white cursor-pointer transition-all hover:font-bold"
                >
                  {link.label}
                </Link>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Information */}
        <div className="bg-white text-gray-800 pt-2">
          <p className="regular-14 w-full text-center">
            2024 LeveSabor® | Todos os direitos reservados | Desenvolvido por{" "}
            <Link
              href="https://example.com"
              className="font-bold hover:underline"
            >
              Pedro Paulo
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
