"use client";

import PublicRoute from "@/components/Guards/PublicRouteGuard";


export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <PublicRoute>{children}</PublicRoute>;
}
