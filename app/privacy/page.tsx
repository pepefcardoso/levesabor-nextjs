"use client";

import React from "react";
import routes from "../../routes/routes";
import { PRIVACY_PARAGRAPHS } from "../../constants";
import FilledButton from "../../components/Buttons/FilledButton";

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-8 py-12 max-w-7xl min-h-[90vh] flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-left w-full">
        Política de Privacidade
      </h1>
      <div className="text-gray-700 text-lg leading-relaxed w-full">
        <div>
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
            color="#F59E0B"
            type="button">
          </FilledButton>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
