"use client";

import { ComponentType, SVGProps } from "react";
import { bgColors } from "../../constants/colors";

export const IconBox = ({
    Icon,
}: {
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
}) => (
    <div className={`flex items-center justify-center w-10 h-10  rounded-md shadow-md ${bgColors.secondary}`}>
        <Icon className="text-black text-xl" />
    </div>
);