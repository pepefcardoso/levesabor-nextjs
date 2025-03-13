"use client";

import { InputHTMLAttributes } from "react";
import clsx from "clsx";
import { Typography } from "@/constants/typography";
import { txtColors } from "@/constants/colors";

export const enum InputType {
  Text = "text",
  Email = "email",
  Tel = "tel",
  Password = "password",
  Number = "number",
  Date = "date",
}

interface CustomTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: InputType;
  label?: string;
}

const CustomTextInput = ({
  type = InputType.Text,
  disabled,
  label,
  className,
  ...props
}: CustomTextInputProps) => {

  const baseClasses = clsx(
    "w-full border border-gray-300 rounded-md",
    "px-4 py-3",
    "shadow-md",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "transition-all duration-200",
    "text-base",
    "outline-none",
    "focus:border-secondary focus:ring-2 focus:ring-secondary",
    className
  );

  return (
    <div className="space-y-1 w-full">
      {label && (
        <label className={clsx(Typography.Subtitle, txtColors.gray800, "block")}>
          {label}
        </label>
      )}
      <input
        {...props}
        type={type}
        disabled={disabled}
        className={baseClasses.trim()}
      />
    </div>
  );
};

export default CustomTextInput;