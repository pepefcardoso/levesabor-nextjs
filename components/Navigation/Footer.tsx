import React from "react";
import { FOOTER_LINKS } from "../../constants";
import routes from "../../routes/routes";
import TextButton from "../Buttons/TextButton";
import { bgColors, txtColors } from "../../constants/colors";
import { TextButtonHovers } from "../../typings/buttons";
import { Typography } from "../../constants/typography";

const Footer = () => {
  return (
    <footer className={`flexCenter mb-2 ${bgColors.primary}`}>
      <div className="flex flex-col w-full">
        <div className="shadow-[0_-4px_8px_-2px_rgba(0,0,0,0.2)]">
          <div className="flex flex-col lg:flex-row items-center justify-between max-container padding-container relative z-30 py-4">
            <TextButton
              href={routes.home}
              text="LeveSabor"
              color={txtColors.white}
              typography={Typography.Display}
            />

            <div className="lg:hidden mb-5" />

            <ul className="hidden lg:flex h-full gap-12">
              {FOOTER_LINKS.map((link) => (
                <li key={link.key}>
                  <TextButton
                    href={link.href}
                    text={link.label}
                    color={txtColors.white}
                    hoverAnimation={TextButtonHovers.scale}
                  />
                </li>
              ))}
            </ul>

            <ul className="lg:hidden flex flex-col gap-2 w-full text-center">
              {FOOTER_LINKS.map((link) => (
                <li key={link.key}>
                  <TextButton
                    href={link.href}
                    text={link.label}
                    color={txtColors.white}
                    hoverAnimation={TextButtonHovers.scale}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`bg-white ${txtColors.gray500} pt-2`}>
          <p className="regular-14 w-full text-center">
            2025 LeveSabor® | Todos os direitos reservados | Desenvolvido por{" "}
            <TextButton
              href="https://instagram.com/julialfelisb"
              text="Pedro Paulo"
              color={txtColors.gray500}
              typography={Typography.Quote}
              hoverAnimation={TextButtonHovers.underline}
            />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;