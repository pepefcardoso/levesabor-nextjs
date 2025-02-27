"use client";

import React from "react";
import Link from "next/link";
import routes from "../../routes/routes";

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-8 py-12 max-w-7xl min-h-[90vh] flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center w-full">
        Política de Privacidade
      </h1>
      <div className="text-gray-700 text-lg leading-relaxed w-full">
        <p>
          Sua privacidade é importante para nós. Esta política descreve como
          coletamos, usamos e protegemos suas informações pessoais.
        </p>
        <p className="mt-6">
          Coletamos informações para fornecer melhores serviços a todos os
          nossos usuários. As informações coletadas e a forma como são usadas
          dependem de como você utiliza nossos serviços.
        </p>
        <p className="mt-6">
          Implementamos medidas de segurança para proteger suas informações e
          não compartilhamos seus dados pessoais com terceiros, exceto conforme
          necessário para fornecer nossos serviços ou conforme exigido por lei.
        </p>
        <p className="mt-6">
          Ao utilizar nossos serviços, você concorda com a coleta e uso de
          informações de acordo com esta política.
        </p>
        <div className="mt-8">
          <Link
            href={routes.contact}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg shadow-md"
          >
            Entre em Contato
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
