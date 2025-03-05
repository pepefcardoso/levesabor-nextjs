"use client";

import React from "react";
import routes from "../../routes/routes";
import { PRIVACY_PARAGRAPHS } from "../../constants";
import FilledButton from "../../components/Buttons/FilledButton";
import clsx from "clsx";
import { Typography } from "../../constants/typography";
import { bgColors, txtColors } from "../../constants/colors";
import { FilledButtonHovers } from "../../typings/buttons";

const PrivacyPolicyPage = () => {
  return (
    <div className="mx-auto px-8 py-12 max-w-4xl flex flex-col">
      <h1 className={clsx(
        Typography.Title,
        txtColors.black,
        "text-left w-full mb-6 sm:mb-8"
      )}>
        Política de Privacidade
      </h1>

      <div className="leading-relaxed w-full">
        <div className={clsx(
          Typography.Body,
          txtColors.gray500,
        )}>
          {PRIVACY_PARAGRAPHS.map((paragraph, index) => (
            <p key={index} className={index > 0 ? "mt-6" : ""}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-8 w-full flex justify-start">
          <FilledButton
            text="Converse Conosco"
            href={routes.contact}
            color={bgColors.tertiary}
            hoverAnimation={FilledButtonHovers.opacity}> 
          </FilledButton>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
