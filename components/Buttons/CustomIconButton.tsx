"use client";

import React, { FC } from "react";
import { IconType } from "react-icons";

interface CustomIconButtonProps {
    onClick: (e: React.MouseEvent) => void; // Updated to accept event
    Icon: IconType;
    ariaLabel: string;
    className?: string;
    disabled?: boolean;
    size?: number;
    color?: string;
}

const CustomIconButton: FC<CustomIconButtonProps> = ({
    onClick,
    Icon,
    ariaLabel,
    className = "",
    disabled = false,
    size = 24,
    color = "currentColor",
}) => {
    return (
        <button
            onClick={onClick} // Event is now properly passed
            aria-label={ariaLabel}
            disabled={disabled}
            className={`p-2 rounded-full transition-colors duration-200 focus:outline-none ${
                disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
            } ${className}`}
        >
            <Icon size={size} color={color} />
        </button>
    );
};

export default CustomIconButton;