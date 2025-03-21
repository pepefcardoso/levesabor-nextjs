"use client";

import React, { FC } from "react";
import { IconType } from "react-icons";
import { FiArrowRight } from "react-icons/fi";
import clsx from "clsx";
import Link from "next/link";
import { bgColors, BgColorType, iconColors, IconColorType } from "@/constants/colors";
import { ButtonHovers, ButtonHoverType, ButtonType, ButtonTypes} from "@/typings/buttons";

interface FilledIconButtonProps {
    onClick?: () => void;
    href?: string;
    Icon?: IconType;
    bgColor?: BgColorType;
    iconColor?: IconColorType;
    hoverAnimation?: ButtonHoverType;
    disabled?: boolean;
    size?: number;
    type?: ButtonType;
    className?: string;
}

const FilledIconButton: FC<FilledIconButtonProps> = ({
    onClick,
    href,
    Icon = FiArrowRight,
    bgColor = bgColors.tertiary,
    iconColor = iconColors.white,
    hoverAnimation = ButtonHovers.opacity,
    disabled = false,
    size = 30,
    type = ButtonTypes.button,
    className = "",
}) => {
    const buttonContent = (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={clsx(
                "p-2 rounded-md shadow-sm flex items-center justify-center transition duration-200",
                hoverAnimation,
                bgColor,
                disabled ? "opacity-50 cursor-not-allowed" : "",
                className
            )}
        >
            <Icon size={size} color={iconColor} />
        </button>
    );

    if (href && !disabled) {
        return (
            <Link href={href} passHref legacyBehavior>
                {buttonContent}
            </Link>
        );
    }

    return buttonContent;
};

export default FilledIconButton;
