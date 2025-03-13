"use client";

import Link from "next/link";
import { FC } from "react";
import { Typography, TypographyType } from "../../constants/typography";
import { txtColors, TxtColorType } from "../../constants/colors";
import { ButtonType, ButtonTypes, TextButtonHovers, TextButtonHoverType } from "../../typings/buttons";

interface TextButtonProps {
    text: string;
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: ButtonType;
    color?: TxtColorType;
    typography?: TypographyType;
    hoverAnimation?: TextButtonHoverType;
    className?: string;
}

const TextButton: FC<TextButtonProps> = ({
    text,
    href,
    onClick,
    disabled = false,
    type = ButtonTypes.button,
    color = txtColors.black,
    typography = Typography.Footnote,
    hoverAnimation = TextButtonHovers.none,
    className: className = "",
}) => {

    const baseClasses = `
    inline-block
    ${typography}
    ${color}
    transform
    transition-transform duration-200
    ${hoverAnimation}
    ${disabled ? "cursor-not-allowed opacity-50" : ""}
    ${className}
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