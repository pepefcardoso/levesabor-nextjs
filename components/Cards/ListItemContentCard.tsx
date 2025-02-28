"use client";

import Link from "next/link";
import React from "react";
import CustomIconButton from "../../components/Buttons/CustomIconButton";
import { FaTrash, FaEdit } from "react-icons/fa";
import CustomImage from "../Others/CustomImage";

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

const ContentCard: React.FC<ContentCardProps> = ({
    item,
    detailRoute,
    editRoute,
    handleDelete,
}) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
            <Link href={detailRoute(item.id)} className="block">
                <div className="relative">
                    <CustomImage
                        src={item.image?.url ?? "/placeholder.jpg"}
                        alt={item.title}
                        width="100%"
                        height="100%"
                        rounded="lg"
                        objectFit="cover"
                    />
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 line-clamp-2">{item.title}</h2>
                </div>
            </Link>
            <div className="flex justify-end gap-2 p-4">
                <Link href={editRoute(item.id)} onClick={(e) => e.stopPropagation()}>
                    <CustomIconButton
                        onClick={() => { }}
                        ariaLabel="Edit item"
                        Icon={FaEdit}
                        size={20}
                        color="green"
                    />
                </Link>
                <CustomIconButton
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
