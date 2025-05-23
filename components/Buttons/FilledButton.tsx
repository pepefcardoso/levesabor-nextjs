"use client";

import Link from "next/link";
import { FC } from "react";
import clsx from "clsx";
import { bgColors, BgColorType, txtColors, TxtColorType } from "@/constants/colors";
import { Typography, TypographyType } from "@/constants/typography";

interface FilledButtonProps {
  text: string;
  color?: BgColorType;
  fontColor?: TxtColorType;
  typography?: TypographyType;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const FilledButton: FC<FilledButtonProps> = ({
  text,
  color = bgColors.tertiary,
  fontColor = txtColors.black,
  typography = Typography.Button,
  href,
  onClick,
  type = "button",
  disabled = false,
  className,
}) => {
  const baseClasses = clsx(
    "rounded-md shadow-sm px-4 py-2 flex items-center justify-center transform",
    "transition-[transform,shadow,opacity] transition-transform duration-200",
    typography,
    color,
    fontColor,
    disabled
      ? "cursor-not-allowed opacity-50"
      : clsx(
        "hover:shadow-md hover:opacity-95",
        "active:scale-[0.98]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        "cursor-pointer",
      ),
    className
  );

  const content = <span>{text}</span>;

  if (href && !disabled) {
    return (
      <Link href={href} onClick={onClick} className={baseClasses} aria-disabled={disabled} role="button">
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses} disabled={disabled} type={type} aria-disabled={disabled}>
      {content}
    </button>
  );
};

export default FilledButton;
