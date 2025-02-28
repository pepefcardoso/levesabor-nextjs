import React from "react";

interface Option {
    id: string | number;
    label: string;
}

interface CustomCheckboxInputProps {
    options: Option[];
    selected: (string | number)[];
    onChange: (selected: (string | number)[]) => void;
    variant?: "grid" | "list";
    disabled?: boolean;
}

const CustomCheckboxInput: React.FC<CustomCheckboxInputProps> = ({
    options,
    selected,
    onChange,
    variant = "list",
    disabled = false,
}) => {
    const handleChange = (optionId: string | number, isChecked: boolean) => {
        const newSelected = isChecked
            ? [...selected, optionId]
            : selected.filter((id) => id !== optionId);
        onChange(newSelected);
    };

    const containerClass =
        variant === "grid"
            ? "grid grid-cols-2 sm:grid-cols-3 gap-4"
            : "flex flex-col gap-2";

    return (
        <div className={containerClass}>
            {options.map((option) => {
                const isSelected = selected.includes(option.id);
                if (variant === "grid") {
                    return (
                        <div
                            key={option.id}
                            onClick={() => {
                                if (!disabled) {
                                    handleChange(option.id, !isSelected);
                                }
                            }}
                            className={`
                flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200
                ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-400"}
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
                        >
                            <input
                                type="checkbox"
                                value={option.id}
                                checked={isSelected}
                                onChange={(e) => handleChange(option.id, e.target.checked)}
                                className="hidden"
                                disabled={disabled}
                            />
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-6 h-6 flex-shrink-0 border-2 rounded-sm flex items-center justify-center transition-colors duration-200
                    ${isSelected ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"}`}
                                >
                                    {isSelected && (
                                        <svg
                                            className="w-3 h-3 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-gray-800 text-sm font-medium">
                                    {option.label}
                                </span>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div
                            key={option.id}
                            onClick={() => {
                                if (!disabled) {
                                    handleChange(option.id, !isSelected);
                                }
                            }}
                            className={`flex items-center gap-3 cursor-pointer transition-colors duration-200 ${disabled ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            <input
                                type="checkbox"
                                value={option.id}
                                checked={isSelected}
                                onChange={(e) => handleChange(option.id, e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                disabled={disabled}
                            />
                            <span className="text-gray-800 text-sm font-medium">
                                {option.label}
                            </span>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default CustomCheckboxInput;
