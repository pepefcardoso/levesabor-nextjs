import React, { useState, useRef, useEffect } from "react";
import { txtColors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import clsx from "clsx";

interface Option {
    id: string | number;
    label: string;
}

interface CustomCheckboxInputProps {
    options: Option[];
    selected: (string | number)[];
    onChange: (selected: (string | number)[]) => void;
    placeholder?: string;
    disabled?: boolean;
}

const CustomCheckboxInput: React.FC<CustomCheckboxInputProps> = ({
    options,
    selected,
    onChange,
    placeholder = "Selecione opções",
    disabled = false,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleChange = (optionId: string | number, isChecked: boolean) => {
        const newSelected = isChecked
            ? [...selected, optionId]
            : selected.filter((id) => id !== optionId);
        onChange(newSelected);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabels = options
        .filter((option) => selected.includes(option.id))
        .map((option) => option.label)
        .join(", ");

    return (
        <div className="relative w-full" ref={containerRef}>
            <div
                className={clsx(
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "border-gray-300 border",
                    "flex justify-between items-center",
                    "transition-all duration-150 ease-in-out",
                    "bg-white rounded-md p-2 cursor-pointer ",
                    disabled ? "opacity-50 cursor-not-allowed" : "hover:border-yellow-400",
                    Typography.Body2,
                    txtColors.gray800,
                )}
                onClick={() => {
                    if (!disabled) setIsDropdownOpen(!isDropdownOpen);
                }}
            >
                <span className={clsx(Typography.Body2, txtColors.gray800)}>
                    {selectedLabels || placeholder}
                </span>
                <svg
                    className="w-4 h-4 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={isDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                    ></path>
                </svg>
            </div>

            {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                    {options.map((option) => {
                        const isSelected = selected.includes(option.id);
                        return (
                            <label
                                key={option.id}
                                className={clsx(
                                    "flex items-center gap-3 p-2 cursor-pointer hover:bg-yellow-50",
                                    disabled && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                <input
                                    type="checkbox"
                                    value={option.id}
                                    checked={isSelected}
                                    onChange={(e) =>
                                        handleChange(option.id, e.target.checked)
                                    }
                                    className="mr-2"
                                    disabled={disabled}
                                />
                                <span className={clsx(Typography.Body2, txtColors.gray800)}>
                                    {option.label}
                                </span>
                            </label>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CustomCheckboxInput;
