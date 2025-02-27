"use client";

import { TextareaHTMLAttributes, useState } from "react";

const CustomTextAreaInput = ({
    className = "",
    rows = 4,
    disabled,
    ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    const [isFocused, setIsFocused] = useState(false);

    const baseClasses = `
    w-full
    border border-gray-300 rounded-md
    p-4
    text-base
    shadow-md
    outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all
    resize-y
    ${isFocused ? "focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" : "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}
  `;

    return (
        <textarea
            {...props}
            rows={rows}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`${baseClasses} ${className}`.trim()}
        />
    );
};

export default CustomTextAreaInput;
