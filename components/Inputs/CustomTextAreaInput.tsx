"use client";

import { TextareaHTMLAttributes, useState } from "react";
import colors from "../../constants/colors";
import { Typography } from "../../constants/typography";

interface CustomTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const CustomTextAreaInput: React.FC<CustomTextAreaProps> = ({
  className = "",
  rows = 4,
  disabled,
  label,
  ...props
}) => {
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
    ${
      isFocused
        ? "focus:ring-2 focus:ring-[" + colors.pineappleYellow + "] focus:border-[" + colors.pineappleYellow + "]"
        : "focus:ring-2 focus:ring-[" + colors.erinGreen + "] focus:border-[" + colors.erinGreen + "]"
    }
  `;

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={props.id} className={`${Typography.subtitle} text-[${colors.gray.dark}]`}>
          {label}
        </label>
      )}
      <textarea
        {...props}
        rows={rows}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`${baseClasses} ${className}`.trim()}
      />
    </div>
  );
};

export default CustomTextAreaInput;
