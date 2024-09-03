import { Dropdown } from "antd";
import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavbarDropdown } from "../../../../../constant";
import { useAppDispatch, useAppSelector } from "../../../../../redux";
import { TUser, useCurrentToken } from "../../../../../redux/features/auth";
import { verifyToken } from "../../../../../utils";

export const UserDropdown = () => {
  // items
  const { userItems, adminItems } = NavbarDropdown();
  //   hooks
  const token = useAppSelector(useCurrentToken);
  let user;
  let items = userItems;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  if (user?.role == "user") {
    items = userItems;
  } else {
    items = adminItems;
  }
  return (
    <div className="ml-4">
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <FaUserCircle className="text-[40px]" />
        </a>
      </Dropdown>
    </div>
  );
};
