import { txtColors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import clsx from "clsx";
import React from "react";
import { IconType } from "react-icons";
import { FaBoxOpen } from "react-icons/fa";

interface EmptyListProps {
  title?: string;
  description?: string;
  Icon?: IconType;
}

const EmptyList: React.FC<EmptyListProps> = ({
  title = "Nenhum item foi encontrado",
  description = "No momento não há itens disponíveis",
  Icon = FaBoxOpen,
}) => {
  return (
    <div className="max-w-md w-full flex flex-col items-center text-center px-8 py-16 mx-auto">
      <Icon className="mb-4 text-gray-500" size={80} />
      <h1 className={clsx(Typography.Title)}>{title}</h1>
      <p className={clsx(Typography.Subtitle, txtColors.gray700)}>{description}</p>
    </div>
  );
};

export default EmptyList;
