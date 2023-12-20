import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { Layout } from "../components/layout";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return isAuth ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};
