"use client";

import { iconColors, IconColorType } from "@/constants/colors";
import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";
import { IconType } from "react-icons";
import { FiArrowRight } from "react-icons/fi";

interface IconButtonProps {
    Icon?: IconType;
    color?: IconColorType;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void | Promise<void>;
    href?: string;
    disabled?: boolean;
    size?: number;
    radius?: "full" | "lg" | "xl";
    type?: "button" | "submit" | "reset";
    className?: string;
}

const IconButton: FC<IconButtonProps> = ({
    Icon = FiArrowRight,
    color = iconColors.black,
    onClick,
    href,
    disabled = false,
    size = 20,
    radius = "lg",
    type = "button",
    className = "",
}) => {
    const radiusClass = radius === "full" ? "rounded-full" :
        radius === "xl" ? "rounded-xl" :
            "rounded-lg";
    const baseClasses = clsx(
        className,
        "inline-flex items-center justify-center p-3 transform",
        "transition-[transform,shadow,opacity] transition-transform duration-200",
        disabled ? "cursor-not-allowed opacity-50" : radiusClass,
        !disabled && "hover:bg-gray-100 cursor-pointer",
    );


    if (href && !disabled) {
        return (
            <Link href={href} onClick={onClick} className={baseClasses} aria-disabled={disabled} role="button">
                <Icon size={size} color={color} />
            </Link>
        );
    }

    return (
        <button onClick={onClick} type={type} disabled={disabled} className={baseClasses}>
            <Icon size={size} color={color} />
        </button>
    );
};

export default IconButton;
