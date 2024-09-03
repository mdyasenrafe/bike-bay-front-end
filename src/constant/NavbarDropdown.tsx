import { MenuProps } from "antd";
import { Button, Text } from "../components/atoms";
import { NavLink } from "react-router-dom";

import React from "react";
import { useAppDispatch } from "../redux";
import { logout } from "../redux/features/auth";

export const NavbarDropdown = () => {
  const dispatch = useAppDispatch();
  // user items
  const userItems: MenuProps["items"] = [
    {
      label: <NavLink to={"/dashboard/user/profile"}>Profile</NavLink>,
      key: "0",
    },
    {
      label: <NavLink to={"/dashboard/user/my-rental"}>My Rentals</NavLink>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: <Button onClick={() => dispatch(logout())}>Logout</Button>,
    },
  ];
  //    admin items
  const adminItems: MenuProps["items"] = [
    {
      label: <NavLink to={"/dashboard/admin"}>Dashboard</NavLink>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: <Button onClick={() => dispatch(logout())}>Logout</Button>,
    },
  ];
  return { userItems, adminItems };
};
