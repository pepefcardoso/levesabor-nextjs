import React from "react";
import routes from "../routes/routes";
import clsx from "clsx";
import { Typography } from "@/constants/typography";
import { FaExclamationTriangle } from "react-icons/fa";
import { iconColors, txtColors } from "@/constants/colors";
import FilledButton from "@/components/Buttons/FilledButton";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <div className="mb-8">
        <FaExclamationTriangle size={80} color={iconColors.tertiary} />
      </div>
      <h1 className={clsx(Typography.Display, "mb-4")}>Página não encontrada</h1>
      <p className={clsx(Typography.Body, txtColors.gray700, "mb-12")}>A página que você está procurando não existe.</p>
      <FilledButton text="Voltar para a página inicial" href={routes.home} />
    </div>
  );
}
