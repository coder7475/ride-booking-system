import type { ComponentType } from "react";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { Role } from "@/types/auth.types";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: Role) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);

    if (!isLoading && !data?.data?.email) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
