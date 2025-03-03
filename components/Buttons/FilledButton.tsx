"use client";

import Link from "next/link";
import { FC } from "react";

interface FilledButtonProps {
    text: string;
    fontColor?: string;
    backgroundColor?: string;
    href?: string;
    onClick?: () => void;
    loading?: boolean;
    loadingText?: string;
    type?: "submit" | "button" | "reset";
    disabled?: boolean;
    className?: string;
}

const FilledButton: FC<FilledButtonProps> = ({
    text,
    fontColor = "black",
    backgroundColor = "transparent",
    href,
    onClick,
    loading = false,
    loadingText = text,
    type = "submit",
    disabled = false,
    className = "",
}) => {
    const isTailwindClass = backgroundColor.startsWith("bg-");

    const baseClasses = `
        rounded-md shadow-sm transition-all duration-200 px-4 py-2 flex items-center justify-center
        ${!loading && !disabled ? "hover:opacity-80" : "cursor-not-allowed"} // Change opacity on hover
        ${isTailwindClass ? backgroundColor : ""}
        ${className}
    `;

    const inlineStyle = loading || disabled
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
                aria-disabled={loading || disabled}
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
            disabled={loading || disabled}
            type={type}
        >
            {content}
        </button>
    );
};

export default FilledButton;