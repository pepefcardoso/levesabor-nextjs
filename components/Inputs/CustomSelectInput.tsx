import React from "react";

interface CustomSelectInputProps {
    options: { value: string | number; label: string }[];
    value?: string | number;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    isLoading?: boolean;
    name?: string;
    className?: string;
    required?: boolean;
}

const CustomInputSelect: React.FC<CustomSelectInputProps> = ({
    options,
    value,
    onChange,
    placeholder,
    disabled = false,
    isLoading = false,
    name,
    className = "",
    required = false,
}) => {
    const baseClasses = [
        "p-2 border border-gray-300 rounded-md",
        "focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent",
        "transition-all duration-150 ease-in-out",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "text-gray-700 bg-white",
    ].join(" ");

    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled || isLoading}
            className={`${baseClasses} ${className}`}
            required={required}
        >
            {placeholder && (
                <option value="" disabled={required}>
                    {placeholder}
                </option>
            )}
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default CustomInputSelect;