import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { verifyToken } from "../../../utils/verifyToken";
import { TUser, logout, useCurrentToken } from "../../../redux/features/auth";
import { useAppDispatch, useAppSelector } from "../../../redux";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: ("admin" | "user")[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles,
}) => {
  const location = useLocation();
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  if (roles && (!user || !roles.includes(user?.role))) {
    dispatch(logout());
    return <Navigate to="/signin" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/signin" replace={true} state={{ from: location }} />;
  }

  return <>{children}</>;
};
