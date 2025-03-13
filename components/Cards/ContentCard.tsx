"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import IconButton from "../Buttons/IconButton";
import { FaEdit, FaTrash } from "react-icons/fa";
import { iconColors, txtColors } from "@/constants/colors";
import { FilledButtonHovers } from "@/typings/buttons";
import clsx from "clsx";
import { Typography } from "@/constants/typography";

interface ContentCardProps {
  item: {
    id: string;
    title: string;
    image?: { url: string };
  };
  detailRoute: (id: string) => string;
  editRoute: (id: string) => string;
  handleDelete: (itemId: string) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, detailRoute, editRoute, handleDelete }) => {
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <div className="rounded-md overflow-hidden shadow-md transition-transform duration-300 ease-in-out 
                   hover:scale-105 hover:shadow-lg bg-white">
      <Link href={detailRoute(item.id)} className="block">
        <div className="relative w-full h-36 rounded-t-lg overflow-hidden">
          <Image
            src={imgError || !item.image?.url ? "/placeholder.jpg" : item.image.url}
            alt={item.title}
            fill
            className="object-cover rounded-t-lg"
            onError={handleImageError}
          />
        </div>

        <div className="p-2">
          <h2 className={clsx(Typography.Title2, "mb-1 line-clamp-2")}>{item.title}</h2>
          <p className={clsx(Typography.Body, txtColors.gray500, "line-clamp-2")}>{"#" + item.id}</p>
        </div>
      </Link>
      <div className="flex justify-end gap-1 p-2">
        <Link href={editRoute(item.id)} onClick={(e) => e.stopPropagation()}>
          <IconButton
            href={editRoute(item.id)}
            Icon={FaEdit}
            color={iconColors.green}
            hoverAnimation={FilledButtonHovers.opacity}
          />
        </Link>
        <IconButton
          onClick={() => handleDelete(item.id)}
          Icon={FaTrash}
          color={iconColors.red}
          hoverAnimation={FilledButtonHovers.opacity}
        />
      </div>
    </div>
  );
};

export default ContentCard;
