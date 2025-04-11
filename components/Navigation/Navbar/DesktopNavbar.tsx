// components/Navbar/DesktopNavbar.tsx
"use client";

import clsx from "clsx";
import { bgColors, txtColors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import routes from "@/routes/routes";
import { useState, useRef, useEffect } from "react";
import { NAV_LINKS, USER_LINKS } from "@/constants/index";
import TextButton from "@/components/Buttons/TextButton";
import FilledButton from "@/components/Buttons/FilledButton";
import { User } from "@/typings/user";
import Link from "next/link";
import UserAvatar from "./UserAvatar";


interface DesktopNavbarProps {
    user?: User | null;
    onHandleLogout: () => void;
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ user, onHandleLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current?.contains(event.target as Node) ||
            buttonRef.current?.contains(event.target as Node)
        ) {
            return;
        }
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const renderLinks = () => (
        <>
            {NAV_LINKS.map((link) => (
                <Link
                    key={link.key}
                    href={link.href}
                    className={clsx(Typography.Body, txtColors.white, "mx-2", "hover:font-bold transition-transform")}
                >
                    {link.label}
                </Link>
            ))}
        </>
    );

    const renderUserMenu = () => (
        <div
            ref={dropdownRef}
            className="absolute top-full right-0 mt-2 bg-white shadow-xl rounded-lg p-2 min-w-[200px] z-[1000] border border-gray-400 animate-fade-in"
        >
            {USER_LINKS.map((link) => (
                <div key={link.key} className="border-b border-gray-400 w-full">
                    <TextButton
                        href={link.href}
                        text={link.label}
                        fontColor={txtColors.black}
                        typography={Typography.Body}
                        className="px-2 py-1 w-full text-left"
                    />
                </div>
            ))}
            <div className="px-2 py-3">
                <TextButton text="↪ Sair" fontColor={txtColors.black} onClick={onHandleLogout} />
            </div>
        </div>
    );

    return (
        <nav className="hidden lg:flex flex-grow justify-between">
            <div className="flex items-center gap-8">{renderLinks()}</div>
            <div className="flex items-center gap-6">
                {user ? (
                    <div className="flex items-center gap-4 relative">
                        <div className="flex items-center gap-1">
                            <h2 className={clsx(txtColors.white, Typography.Body)}>
                                Olá,
                            </h2>
                            <Link
                                href={routes.user.profile}
                                className={clsx(txtColors.white, Typography.Subtitle, "hover:underline transition-transform")}>
                                {user.name ?? "Usuário"}
                            </Link>
                        </div>
                        <UserAvatar user={user} isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} ref={buttonRef} />
                        {isDropdownOpen && renderUserMenu()}
                    </div>
                ) : (
                    <div className="flex gap-4 items-center">
                        <Link
                            href={routes.auth.login}
                            className={clsx(Typography.Subtitle, txtColors.white, "hover:scale-110 transition-transform")}>
                            Entrar
                        </Link>
                        <FilledButton href={routes.auth.register} text="Cadastrar" color={bgColors.secondary} />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default DesktopNavbar;
