"use client";

import React from "react";
import { txtColors } from "@/constants/colors";
import clsx from "clsx";
import { FOOTER_LINKS } from "@/constants/index";
import Link from "next/link";
import { Typography } from "@/constants/typography";

interface FooterLinksProps {
    mobile?: boolean;
}

const FooterLinks: React.FC<FooterLinksProps> = ({ mobile = false }) => {
    return (
        <ul
            className={clsx(
                mobile
                    ? "flex flex-col gap-2 w-full text-center lg:hidden"
                    : "hidden lg:flex lg:justify-end gap-12"
            )}
        >
            {FOOTER_LINKS.map((link) => (
                <li key={link.key}>
                    <Link
                        href={link.href}
                        className={clsx(Typography.Body, txtColors.white, mobile ? "text-left px-4 py-2" : "", "hover:underline")}
                    >{link.label}</Link>
                </li>
            ))}
        </ul>
    );
};

export default React.memo(FooterLinks);
