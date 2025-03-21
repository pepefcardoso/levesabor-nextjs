import React from "react";
import { FOOTER_LINKS } from "../../constants";
import routes from "../../routes/routes";
import TextButton from "../Buttons/TextButton";
import { bgColors, txtColors } from "../../constants/colors";
import { ButtonHovers } from "../../typings/buttons";
import { Typography } from "../../constants/typography";
import clsx from "clsx";

const Footer = () => {
  return (
    <footer className={clsx("flexCenter mb-2", bgColors.primary)}>
      <div className="flex flex-col w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between max-container padding-container relative z-30 py-4">
          <div className="lg:flex-1 lg:text-start flex items-center">
            <TextButton href={routes.home} text="LeveSabor" color={txtColors.white} typography={Typography.Headline} />
          </div>

          <div className="lg:hidden mb-5" />

          <ul className="hidden lg:flex lg:flex-1 lg:justify-end gap-12">
            {FOOTER_LINKS.map((link) => (
              <li key={link.key}>
                <TextButton
                  href={link.href}
                  text={link.label}
                  color={txtColors.white}
                  hoverAnimation={ButtonHovers.bold}
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
                  hoverAnimation={ButtonHovers.bold}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white py-2">
          <p className={clsx("w-full text-center", Typography.Footnote, txtColors.gray500)}>
            2025 LeveSabor® | Todos os direitos reservados | Desenvolvido por{" "}
            <TextButton
              href="https://instagram.com/pepefcardoso"
              text="Agência PPD"
              color={txtColors.gray800}
              typography={Typography.Body}
              hoverAnimation={ButtonHovers.underline}
            />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
