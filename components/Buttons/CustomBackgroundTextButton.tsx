"use client";

import Link from "next/link";
import { FC } from "react";

interface CustomBackgroundTextButtonProps {
    text: string;
    fontColor?: string;
    backgroundColor?: string;
    href?: string;
    onClick?: () => void;
    loading?: boolean;
    loadingText?: string;
    type?: "submit" | "button" | "reset";
}

const CustomBackgroundTextButton: FC<CustomBackgroundTextButtonProps> = ({
    text,
    fontColor = "black",
    backgroundColor = "transparent",
    href,
    onClick,
    loading = false,
    loadingText = text,
    type = "submit",
}) => {
    const isTailwindClass = backgroundColor.startsWith("bg-");

    const baseClasses = `
    rounded-md shadow-md transition-all duration-200 px-4 py-2 flex items-center justify-center
    ${!loading ? "hover:shadow-lg hover:scale-105 hover:font-bold" : "cursor-not-allowed"}
    ${isTailwindClass ? backgroundColor : ""}
  `;

    const inlineStyle = loading
        ? { color: "#6B7280", backgroundColor: "#E5E7EB" }
        : {
            color: fontColor,
            backgroundColor: isTailwindClass ? undefined : backgroundColor,
        };

    const content = loading ? <span>{loadingText}</span> : <span>{text}</span>;

    if (href) {
        return (
            <Link
                href={href}
                onClick={onClick}
                className={baseClasses}
                style={inlineStyle}
                aria-disabled={loading}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className={baseClasses}
            style={inlineStyle}
            disabled={loading}
            type={type}
        >
            {content}
        </button>
    );
};

export default CustomBackgroundTextButton;