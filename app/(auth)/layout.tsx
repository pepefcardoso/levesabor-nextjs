"use client";

import PrivateRoute from "@/components/Guards/PrivateRouteGuard";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <PrivateRoute>{children}</PrivateRoute>;
}
