"use client";

import React, { FC } from "react";
import { IconType } from "react-icons";
import { iconColors, IconColorType } from "../../constants/colors";

interface IconButtonProps {
    onClick: (e: React.MouseEvent) => void;
    Icon: IconType;
    ariaLabel: string;
    className?: string;
    disabled?: boolean;
    size?: number;
    color?: IconColorType;
}

const IconButton: FC<IconButtonProps> = ({
    onClick,
    Icon,
    ariaLabel,
    className = "",
    disabled = false,
    size = 24,
    color = iconColors.white,
}) => {
    return (
        <button
            onClick={onClick}
            aria-label={ariaLabel}
            disabled={disabled}
            className={`p-2 rounded-full transition-colors duration-200 focus:outline-none ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
                } ${className}`}
        >
            <Icon size={size} color={color} />
        </button>
    );
};

export default IconButton;