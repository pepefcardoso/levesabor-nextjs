"use client";

import { TextareaHTMLAttributes } from "react";
import clsx from "clsx";
import { Typography } from "@/constants/typography";

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
    "border border-tertiary rounded-md",
    "px-4 py-3",
    "shadow-md",
    "outline-none",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "transition-all",
    "resize-y",
    "focus:border-secondary focus:ring-2 focus:ring-tertiary"
  );

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={props.id} className={clsx(Typography.Subtitle)}>
          {label}
        </label>
      )}
      <textarea {...props} rows={rows} disabled={disabled} className={clsx(baseClasses, className)} />
    </div>
  );
};

export default CustomTextAreaInput;
