"use client";

import FilledButton from "@/components/Buttons/FilledButton";
import { txtColors } from "@/constants/colors";
import { ABOUT_US_IMAGE, ABOUT_US_PARAGRAPHS } from "@/constants/index";
import { Typography } from "@/constants/typography";
import { clsx } from "clsx";
import Image from "next/image";
import routes from "../../../routes/routes";

const AboutPage = () => {
  return (
    <div className="mx-auto px-8 py-12 max-w-7xl flex flex-col items-center">
      <h1 className={clsx(Typography.Headline, "mb-4 sm:mb-8 text-left w-full")}>Sobre Nós</h1>

      <div className="flex flex-col md:flex-row items-stretch md:space-x-12 w-full">
        <div className="relative flex-shrink-0 w-full md:w-1/2 rounded-lg shadow-md h-[300px] md:h-[450px]">
          <Image
            src={ABOUT_US_IMAGE || "/placeholder.jpg"}
            alt="Team Working"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <div className={clsx("text-left w-full md:w-1/2 flex flex-col justify-between mt-4 md:mt-0")}>
          <div>
            {ABOUT_US_PARAGRAPHS.map((paragraph, index) => (
              <p key={index} className={clsx(index > 0 ? "mt-4" : "", Typography.Body, txtColors.gray700)}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 flex justify-start">
            <FilledButton text="Converse Conosco" href={routes.contact} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
