"use client";

import Link from "next/link";
import clsx from "clsx";
import { Typography } from "@/constants/typography";
import { txtColors } from "@/constants/colors";
import routes from "@/routes/routes";
import React from "react";

const FooterBrand = () => {
    return (
        <div className="flex items-center lg:flex-1">
            <Link
                href={routes.home}
                className={clsx(Typography.Headline, txtColors.white, "lg:flex-none")}
            >
                LeveSabor
            </Link>
        </div>
    );
};

export default React.memo(FooterBrand);
