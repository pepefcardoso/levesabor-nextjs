"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import PageSkeleton from "@/components/Skeletons/PageSkeleton"; // Opcional: caso queira mostrar um loading

export default function PublicRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/");
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
        return <PageSkeleton />;
    }

    return <>{children}</>;
}
