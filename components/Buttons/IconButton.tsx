"use client";

import { iconColors, IconColorType } from "@/constants/colors";
import {
    ButtonType,
    ButtonTypes,
    FilledIconButtonHovers,
    FilledIconButtonHoverType
} from "@/typings/buttons";
import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";
import { IconType } from "react-icons";
import { FiArrowRight } from "react-icons/fi";

interface IconButtonProps {
    onClick?: () => void;
    href?: string;
    Icon?: IconType;
    color?: IconColorType;
    hoverAnimation?: FilledIconButtonHoverType;
    disabled?: boolean;
    size?: number;
    type?: ButtonType;
    className?: string;
}

const IconButton: FC<IconButtonProps> = ({
    onClick,
    href,
    Icon = FiArrowRight,
    color = iconColors.black,
    hoverAnimation = FilledIconButtonHovers.opacity,
    disabled = false,
    size = 20,
    type = ButtonTypes.button,
    className = "",
}) => {
    const baseClasses = clsx(
        "inline-flex items-center justify-center p-2 rounded-full",
        "hover:bg-gray-200",
        "transition ease-in-out duration-150",
        hoverAnimation,
        disabled && "opacity-50 cursor-not-allowed",
        className
    );

    if (href) {
        return (
            <Link href={href} passHref legacyBehavior>
                <a className={baseClasses} onClick={onClick}>
                    <Icon size={size} color={color} />
                </a>
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
