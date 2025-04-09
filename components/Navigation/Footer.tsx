import React from "react";
import { FOOTER_LINKS } from "../../constants";
import routes from "../../routes/routes";
import TextButton from "../Buttons/TextButton";
import { bgColors, txtColors } from "../../constants/colors";
import { Typography } from "../../constants/typography";
import clsx from "clsx";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={clsx("flexCenter mb-2", bgColors.primary)}>
      <div className="flex flex-col w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between relative z-30 py-4">
          <div className="lg:flex-1 lg:text-start flex items-center">
            <Link
              href={routes.home}
              className={clsx(Typography.Headline, txtColors.white, "lg:flex-none")}
            >LeveSabor</Link>
          </div>

          <div className="lg:hidden mb-5" />

          <ul className="hidden lg:flex lg:flex-1 lg:justify-end gap-12">
            {FOOTER_LINKS.map((link) => (
              <li key={link.key}>
                <TextButton
                  href={link.href}
                  text={link.label}
                  fontColor={txtColors.white}
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
                  fontColor={txtColors.white}
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
              fontColor={txtColors.gray700}
              typography={Typography.Body}
            />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
