"use client";

import React, { FC } from "react";

interface CustomDialogProps {
    title?: string;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

const CustomDialog: FC<CustomDialogProps> = ({
    title,
    onClose,
    children,
    className = "",
}) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
        >
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            ></div>
            <div
                className={`relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-10 ${className}`}
            >
                {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default CustomDialog;
