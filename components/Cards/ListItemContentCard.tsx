"use client";

import Link from "next/link";
import React from "react";
import IconButton from "../Buttons/IconButton";
import { FaTrash, FaEdit } from "react-icons/fa";
import Image from "next/image";

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
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      <Link href={detailRoute(item.id)} className="block">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src={item.image?.url ?? "/placeholder.jpg"}
            alt={item.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 line-clamp-2">{item.title}</h2>
        </div>
      </Link>
      <div className="flex justify-end gap-2 p-4">
        <Link href={editRoute(item.id)} onClick={(e) => e.stopPropagation()}>
          <IconButton onClick={() => {}} ariaLabel="Edit item" Icon={FaEdit} size={20} color="green" />
        </Link>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(item.id);
          }}
          ariaLabel="Delete item"
          Icon={FaTrash}
          size={20}
          color="red"
        />
      </div>
    </div>
  );
};

export default ContentCard;
