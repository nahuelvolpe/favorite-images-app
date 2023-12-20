import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return isAuth ? <Navigate to="/" /> : <>{children}</>;
};
