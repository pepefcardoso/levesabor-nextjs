import Image from "next/image";
import React from "react";

interface CustomImageProps {
    src: string;
    alt: string;
    width?: string;
    height?: string;
    rounded?: "sm" | "md" | "lg" | "full";
    objectFit?: "cover" | "contain" | "fill" | "none";
    priority?: boolean;
    shadow?: "none" | "sm" | "md" | "lg";
}

const CustomImage: React.FC<CustomImageProps> = ({
    src,
    alt,
    width = "100%",
    height = "450px",
    rounded = "md",
    objectFit = "cover",
    priority = false,
    shadow = "md",
}) => {
    const roundedClass = {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
    }[rounded];

    const shadowClass = {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
    }[shadow];

    return (
        <div className="relative" style={{ width, height }}>
            <Image
                src={src}
                alt={alt}
                fill
                className={`${roundedClass} object-${objectFit} ${shadowClass}`}
                priority={priority}
            />
        </div>
    );
};

export default CustomImage;