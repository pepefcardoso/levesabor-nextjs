import React, { useState, useRef, useEffect } from "react";
import { txtColors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import clsx from "clsx";

interface Option {
  value: string | number;
  label: string;
}

interface CustomSelectInputProps {
  options: Option[];
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
  placeholder = "Selecione uma opção",
  disabled = false,
  isLoading = false,
  name,
  className = "",
  label,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : placeholder;

  const handleSelect = (optionValue: string | number) => {
    const event = {
      target: { value: optionValue },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange(event);
    setIsDropdownOpen(false);
  };

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      {label && (
        <label htmlFor={name} className={clsx(Typography.Subtitle)}>
          {label}
        </label>
      )}
      <div
        className={clsx(
          "border border-gray-400 rounded-md p-2 cursor-pointer flex justify-between items-center",
          "transition-all duration-150 ease-in-out",
          "bg-white",
          disabled || isLoading ? "opacity-50 cursor-not-allowed" : "hover:border-tertiary",
          className
        )}
        onClick={() => {
          if (!disabled && !isLoading) {
            setIsDropdownOpen(!isDropdownOpen);
          }
        }}
      >
        <span className={clsx(Typography.Helper, txtColors.gray800)}>{displayValue}</span>
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
          {options.map((option) => (
            <div
              key={option.value}
              className={clsx(
                "p-2 cursor-pointer hover:bg-yellow-50 transition-all duration-150 ease-in-out",
                Typography.Caption,
                option.value === value ? "bg-yellow-50" : ""
              )}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomInputSelect;
