"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import PageSkeleton from "@/components/Skeletons/PageSkeleton"; // Exibe um loading enquanto valida
import routes from "@/routes/routes";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace(routes.auth.login);
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return <PageSkeleton />;
    }

    return <>{children}</>;
}
