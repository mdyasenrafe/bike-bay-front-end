import React from "react";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../../utils/verifyToken";
import { TUser, logout, useCurrentToken } from "../../../redux/features/auth";
import { useAppDispatch, useAppSelector } from "../../../redux";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: string | undefined;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  role,
}) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  if (role && user?.role !== role) {
    dispatch(logout());
    return <Navigate to="/sigin" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/signin" replace={true} />;
  }

  return <>{children}</>;
};
