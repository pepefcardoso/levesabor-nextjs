"use client";

import Image from "next/image";
import React from "react";
import routes from "../../routes/routes";
import TextButton from "../../components/Buttons/TextButton";
import { ABOUT_US_IMAGE, ABOUT_US_PARAGRAPHS } from "../../constants";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-8 py-12 max-w-7xl min-h-[90vh] flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center md:text-left w-full">
        Sobre Nós
      </h1>

      <div className="flex flex-col md:flex-row items-stretch md:space-x-12 w-full">
        <div className="flex-shrink-0 w-full md:w-1/2">
          <Image
            src={ABOUT_US_IMAGE}
            alt="Team Working"
            width={800}
            height={800}
            className="rounded-lg object-cover h-full"
          />
        </div>

        <div className="text-gray-700 text-lg leading-relaxed mt-8 md:mt-0 md:w-1/2 flex flex-col justify-between">
          <div>
            {ABOUT_US_PARAGRAPHS.map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-6" : ""}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8">
            <TextButton
              text="Converse Conosco"
              href={routes.contact}
              backgroundColor="#F59E0B"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
