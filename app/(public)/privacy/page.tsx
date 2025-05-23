"use client";

import FilledButton from "@/components/Buttons/FilledButton";
import { txtColors } from "@/constants/colors";
import { PRIVACY_PARAGRAPHS } from "@/constants/index";
import { Typography } from "@/constants/typography";
import clsx from "clsx";
import routes from "../../../routes/routes";

const PrivacyPolicyPage = () => {
  return (
    <div className="mx-auto px-8 py-12 max-w-4xl flex flex-col">
      <h1 className={clsx(Typography.Headline, "text-left w-full mb-6 sm:mb-8")}>Política de Privacidade</h1>

      <div className="leading-relaxed w-full">
        <div className={clsx(Typography.Body, txtColors.gray700)}>
          {PRIVACY_PARAGRAPHS.map((paragraph, index) => (
            <p key={index} className={index > 0 ? "mt-4" : ""}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-8 w-full flex justify-start">
          <FilledButton
            text="Converse Conosco"
            href={routes.contact}
          ></FilledButton>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
