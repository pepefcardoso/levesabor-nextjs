"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { bgColors, txtColors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import routes from "@/routes/routes";
import FilledButton from "@/components/Buttons/FilledButton";
import { User } from "@/typings/user";
import { NAV_LINKS, USER_LINKS } from "@/constants/index";
import { sanitizeImageUrl } from "../../../tools/helper";

interface MobileNavbarProps {
    user?: User | null;
    onHandleLogout: () => void;
    onClose: () => void;
    isOpen: boolean;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ user, onHandleLogout, onClose, isOpen }) => {
    const renderLinks = () => (
        <>
            {NAV_LINKS.map((link) => (
                <Link
                    key={link.key}
                    href={link.href}
                    className={clsx(
                        Typography.Button,
                        txtColors.white,
                        "hover:font-bold transition-transform"
                    )}
                    onClick={onClose}
                >
                    {link.label}
                </Link>
            ))}
        </>
    );

    const renderUserMenu = () => (
        <>
            {USER_LINKS.map((link) => (
                <div key={link.key}>
                    <Link
                        href={link.href}
                        className={clsx(
                            Typography.Button,
                            txtColors.white,
                            "hover:font-bold transition-transform"
                        )}
                        onClick={onClose}
                    >
                        {link.label}
                    </Link>
                </div>
            ))}
            <div>
                <button
                    className={clsx(
                        Typography.Subtitle,
                        txtColors.white,
                        "text-left mt-2 hover:scale-110 transition-transform cursor-pointer"
                    )}
                    onClick={onHandleLogout}
                >
                    ↪ Sair
                </button>
            </div>
        </>
    );

    return (
        <nav
            className={clsx(
                "fixed inset-y-0 left-0 w-64 flex flex-col h-full transition-transform duration-300 ease-in-out z-50",
                bgColors.primary,
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}
        >
            <div className="flex items-center justify-between px-6 py-6">
                <Link href={routes.home} className={clsx(Typography.Headline, txtColors.white)}>
                    LeveSabor
                </Link>
                <button onClick={onClose} aria-label="Fechar menu" className="cursor-pointer">
                    <Image src="/close.svg" alt="Fechar" width={24} height={24} />
                </button>
            </div>
            <div className="flex flex-col gap-6 px-6">{renderLinks()}</div>
            <div className="px-6 mt-auto pb-6">
                {user ? (
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-1">
                            <div className="relative shadow-sm w-8 h-8 rounded-full overflow-hidden mr-2">
                                <Image src={sanitizeImageUrl(user.image?.url)} alt="User profile" fill
                                    className="object-cover" />
                            </div>
                            <h2 className={clsx(txtColors.white, Typography.Body)}>
                                Olá,
                            </h2>
                            <Link
                                href={routes.user.profile}
                                className={clsx(txtColors.white, Typography.Subtitle, "hover:underline transition-transform")}>
                                {user.name ?? "Usuário"}
                            </Link>
                        </div>
                        <div className="flex flex-col gap-6">{renderUserMenu()}</div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 items-center">
                        <Link
                            href={routes.auth.login}
                            className={clsx(Typography.Subtitle, txtColors.white, "w-full text-center", "hover:scale-110 transition-transform")}
                        >
                            Entrar
                        </Link>
                        <FilledButton
                            href={routes.auth.register}
                            text="Cadastrar"
                            color={bgColors.secondary}
                            className="w-full"
                        />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default MobileNavbar;
