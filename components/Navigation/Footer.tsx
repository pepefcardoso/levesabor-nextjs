import React from "react";
import { FOOTER_LINKS } from "../../constants";
import routes from "../../routes/routes";
import CustomTextButton from "../Buttons/CustomTextButton";

const Footer = () => {
  return (
    <footer className="flexCenter mb-2 bg-green-80">
      <div className="flex flex-col w-full">
        <div className="shadow-[0_-4px_8px_-2px_rgba(0,0,0,0.2)]">
          <div className="flex flex-col lg:flex-row items-center justify-between max-container padding-container relative z-30 py-4">
            <CustomTextButton
              href={routes.home}
              text="LeveSabor"
              fontColor="white"
              className="bold-32"
            />

            <div className="lg:hidden mb-5" />

            <ul className="hidden lg:flex h-full gap-12">
              {FOOTER_LINKS.map((link) => (
                <li key={link.key}>
                  <CustomTextButton
                    href={link.href}
                    text={link.label}
                    fontColor="white"
                    className="regular-18"
                  />
                </li>
              ))}
            </ul>

            <ul className="lg:hidden flex flex-col gap-2 w-full text-center">
              {FOOTER_LINKS.map((link) => (
                <li key={link.key}>
                  <CustomTextButton
                    href={link.href}
                    text={link.label}
                    fontColor="white"
                    className="regular-18"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white text-gray-800 pt-2">
          <p className="regular-14 w-full text-center">
            2025 LeveSabor® | Todos os direitos reservados | Desenvolvido por{" "}
            <CustomTextButton
              href="https://instagram.com/julialfelisb"
              text="Pedro Paulo"
              fontColor="inherit"
              className="font-bold hover:underline"
            />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;