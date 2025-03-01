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
    label?: string;
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
    label,
}) => {
    const baseClasses = [
        "p-2 border border-gray-300 rounded-md",
        "focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent",
        "transition-all duration-150 ease-in-out",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "text-gray-700 bg-white",
    ].join(" ");

    return (
        <div className="space-y-1">
            {label && (
                <label htmlFor={name} className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <select
                name={name}
                id={name}
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
        </div>
    );
};

export default CustomInputSelect;
