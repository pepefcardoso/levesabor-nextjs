"use client";

import React from "react";
import Link from "next/link";
import routes from "../../routes/routes";

const TermsOfUsePage = () => {
  return (
    <div className="container mx-auto px-8 py-12 max-w-7xl min-h-[90vh] flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center w-full">
        Termos de Uso
      </h1>
      <div className="text-gray-700 text-lg leading-relaxed w-full">
        <p>
          Ao acessar e utilizar nossos serviços, você concorda em cumprir os
          seguintes termos e condições.
        </p>
        <p className="mt-6">
          Você é responsável por manter a confidencialidade de suas informações
          de login e por todas as atividades que ocorram sob sua conta.
        </p>
        <p className="mt-6">
          É proibido utilizar nossos serviços para qualquer finalidade ilegal ou
          não autorizada. Você concorda em não violar nenhuma lei em sua
          jurisdição ao usar nossos serviços.
        </p>
        <p className="mt-6">
          Reservamo-nos o direito de modificar ou encerrar nossos serviços a
          qualquer momento, sem aviso prévio.
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

export default TermsOfUsePage;
