import { txtColors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import clsx from 'clsx';
import React from 'react';
import { FaBoxOpen } from 'react-icons/fa';

interface EmptyListProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

const EmptyList: React.FC<EmptyListProps> = ({
  title = "Nenhum item foi encontrado",
  description = "No momento não há itens disponíveis",
  icon = <FaBoxOpen size={80} className="mx-auto text-gray-400" />
}) => {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="mb-4">{icon}</div>
      <h1 className={clsx(Typography.Headline)}>{title}</h1>
      <p className={clsx(Typography.Title, txtColors.gray800)}>{description}</p>
    </div>
  );
};

export default EmptyList;
