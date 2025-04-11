"use client";

import React from "react";
import { Typography } from "@/constants/typography";
import { txtColors } from "@/constants/colors";
import clsx from "clsx";
import Link from "next/link";

const FooterCredits = () => {
    return (
        <div className="bg-white py-2">
            <p className={clsx("w-full text-center", Typography.Label, txtColors.gray500)}>
                2025 LeveSabor® | Todos os direitos reservados | Desenvolvido por{" "}
                <Link
                    href="https://instagram.com/pepefcardoso"
                    className={clsx(Typography.Label, txtColors.gray700, "hover:underline")}
                >
                    Agência PPD
                </Link>
            </p>
        </div>
    );
};

export default React.memo(FooterCredits);
