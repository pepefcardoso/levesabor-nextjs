"use client";

import Link from "next/link";
import { FC } from "react";

interface CustomTextButtonProps {
    text: string;
    fontColor?: string;
    href?: string;
    onClick?: () => void;
    loading?: boolean;
    loadingText?: string;
    type?: "submit" | "button" | "reset";
    className?: string;
}

const CustomTextButton: FC<CustomTextButtonProps> = ({
    text,
    fontColor = "black",
    href,
    onClick,
    loading = false,
    loadingText = text,
    type = "submit",
    className = "",
}) => {
    const baseClasses = `
        transition-all duration-200
        ${!loading ? "hover:font-bold hover:scale-105" : "cursor-not-allowed"}
        ${className}
    `;

    const inlineStyle = {
        color: fontColor,
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

export default CustomTextButton;