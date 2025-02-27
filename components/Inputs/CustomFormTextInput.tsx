"use client";

import { InputHTMLAttributes } from "react";

interface CustomFormTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "email" | "tel" | "password" | "number";
}

const CustomFormTextInput = ({
  type = "text",
  disabled,
  ...props
}: CustomFormTextInputProps) => {
  const baseClasses = `
    w-full border border-gray-300 rounded-md
    px-4 py-3
    shadow-md
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-200
    text-base
    outline-none
    focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500
  `;

  return (
    <input
      {...props}
      type={type}
      disabled={disabled}
      className={baseClasses.trim()}
    />
  );
};

export default CustomFormTextInput;
