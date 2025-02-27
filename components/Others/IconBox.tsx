"use client";

import { ComponentType, SVGProps } from "react";

export const IconBox = ({
    Icon,
}: {
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
}) => (
    <div className="flex items-center justify-center w-10 h-10 bg-yellow-500 rounded-md shadow-md">
        <Icon className="text-white text-lg" />
    </div>
);