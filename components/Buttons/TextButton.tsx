"use client";

import Link from "next/link";
import { FC } from "react";
import { Typography, TypographyType } from "../../constants/typography";
import { txtColors, TxtColorType } from "../../constants/colors";

export type HoverAnimationType = (typeof HoverAnimations)[keyof typeof HoverAnimations];
export const HoverAnimations = {
    underline: "hover:underline",
    scale: "hover:scale-105",
    bold: "hover:font-bold",
    none: "",
}

interface TextButtonProps {
    text: string;
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: "submit" | "button" | "reset";
    color?: TxtColorType;
    typography?: TypographyType;
    hoverAnimation?: HoverAnimationType;
}

const TextButton: FC<TextButtonProps> = ({
    text,
    href,
    onClick,
    disabled = false,
    type = "button",
    color = txtColors.black,
    typography = Typography.button,
    hoverAnimation = HoverAnimations.none,
}) => {

    const baseClasses = `
    ${typography}
    ${color}
    transition-all duration-200
    ${hoverAnimation}
    ${disabled ? "cursor-not-allowed opacity-50" : ""}
  `;

    if (href && !disabled) {
        return (
            <Link
                href={href}
                onClick={onClick}
                className={baseClasses.trim()}
                aria-disabled={disabled}
            >
                {text}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={baseClasses.trim()}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default TextButton;