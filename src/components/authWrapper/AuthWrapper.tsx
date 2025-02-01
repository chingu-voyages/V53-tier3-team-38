import React from "react";
import { Navigate } from "react-router-dom";

interface AuthWrapperProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({
  isAuthenticated,
  children,
}) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};
