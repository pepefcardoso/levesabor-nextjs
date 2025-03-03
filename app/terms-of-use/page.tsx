"use client";

import React from "react";
import routes from "../../routes/routes";
import { TERMS_OF_USE_PARAGRAPHS } from "../../constants";
import FilledButton from "../../components/Buttons/FilledButton";

const TermsOfUsePage = () => {
  return (
    <div className="container mx-auto px-8 py-12 max-w-7xl min-h-[90vh] flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center w-full">
        Termos de Uso
      </h1>
      <div className="text-gray-700 text-lg leading-relaxed w-full">
        <div>
          {TERMS_OF_USE_PARAGRAPHS.map((paragraph, index) => (
            <p key={index} className={index > 0 ? "mt-6" : ""}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-8 w-full flex justify-start">
          <FilledButton
            text="Converse Conosco"
            href={routes.contact}
            backgroundColor="#F59E0B"
            type="button">
          </FilledButton>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUsePage;
