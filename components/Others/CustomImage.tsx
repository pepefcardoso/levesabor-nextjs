import Image from "next/image";
import React from "react";

interface CustomImageProps {
    src: string;
    alt: string;
    width?: string | number;
    height?: string | number;
    rounded?: "sm" | "md" | "lg" | "full";
    objectFit?: "cover" | "contain" | "fill" | "none";
    priority?: boolean;
    shadow?: "none" | "sm" | "md" | "lg";
    className?: string;
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
    className = "",
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

    const objectFitClass = `object-${objectFit}`;


    const widthStyle = typeof width === "number" ? `${width}px` : width;
    const heightStyle = typeof height === "number" ? `${height}px` : height;

    return (
        <div
            className={`relative ${roundedClass} ${shadowClass} ${className}`}
            style={{ width: widthStyle, height: heightStyle }}
        >
            <Image
                src={src || "/placeholder.jpg"}
                alt={alt}
                fill
                className={objectFitClass}
                priority={priority}
            />
        </div>
    );
};

export default CustomImage;