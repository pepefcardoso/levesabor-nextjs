"use client";

import Image from "next/image";
import clsx from "clsx";
import { Typography } from "@/constants/typography";
import { User } from "@/typings/user";
import { ForwardedRef, forwardRef } from "react";

interface UserAvatarProps {
    user: User;
    isDropdownOpen: boolean;
    setIsDropdownOpen: (open: boolean) => void;
}

const UserAvatar = forwardRef(function UserAvatar(
    { user, isDropdownOpen, setIsDropdownOpen }: UserAvatarProps,
    ref: ForwardedRef<HTMLButtonElement>
) {
    return (
        <button
            ref={ref}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="focus:ring-2 focus:ring-white rounded-full transition-transform hover:scale-105 cursor-pointer"
            aria-label="Abrir menu do usuário"
        >
            {user.image ? (
                <div className="relative w-10 h-10 rounded-full">
                    <Image src={user.image.url} alt="User profile" width={40} height={40} className="object-cover rounded-full" />
                </div>
            ) : (
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <span className={clsx(Typography.Title)}>
                        {user.name ? user.name.charAt(0).toUpperCase() : "A"}
                    </span>
                </div>
            )}
        </button>
    );
});

export default UserAvatar;
