"use client";

import { TextareaHTMLAttributes } from "react";
import { Typography } from "../../constants/typography";
import { txtColors } from "../../constants/colors";
import clsx from "clsx";

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
  const baseClasses = clsx(
    "w-full",
    "border border-gray-300 rounded-md",
    "p-4",
    "text-base",
    "shadow-md",
    "outline-none",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "transition-all",
    "resize-y",
    "focus:border-secondary focus:ring-2 focus:ring-secondary"
  );

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={props.id} className={`${Typography.Subtitle} text-[${txtColors.gray500}]`}>
          {label}
        </label>
      )}
      <textarea
        {...props}
        rows={rows}
        disabled={disabled}
        className={`${baseClasses} ${className}`.trim()}
      />
    </div>
  );
};

export default CustomTextAreaInput;
