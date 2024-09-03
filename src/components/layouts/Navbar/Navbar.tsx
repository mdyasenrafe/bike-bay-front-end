import React, { useEffect, useState } from "react";
import { Button, Container, Text } from "../../atoms";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import { Dropdown, Menu, MenuProps, Space } from "antd";
import { generateNavItems } from "../../../utils";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineX } from "react-icons/hi";
import { DarkMode, UserDropdown } from "./components";
import { appRoutes } from "../../../routes";
import { useAppSelector } from "../../../redux";
import { TUser, getCurrentUser } from "../../../redux/features/auth";
import { FaUserCircle } from "react-icons/fa";

export const Navbar = () => {
  // state
  const [isMenuVisible, setMenuVisibility] = useState<boolean>(false);
  // hooks
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useAppSelector(getCurrentUser);
  const currentPath = location.pathname;

  // nav items
  const navItems = generateNavItems(appRoutes);
  const mobileNavItems = generateNavItems(
    appRoutes,
    true,
    currentUser as TUser
  );

  return (
    <React.Fragment>
      <Container>
        <div className={` min-w-full transition-all delay-75 ease-in-out py-2`}>
          <div className="flex justify-between items-center w-full">
            <div className="ml-3 w-[30%]">
              <div className="flex items-center">
                <NavLink to={"/"}>
                  <img
                    className="h-[50px] py-1 cursor-pointer"
                    src={Logo}
                    alt="Logo"
                  />
                </NavLink>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex w-[50%]">
              <Menu
                style={{
                  width: "100%",
                  borderBottom: "0px solid",
                }}
                mode="horizontal"
                items={navItems}
                selectedKeys={[currentPath]}
                className="font-figtree"
              />
            </div>
            <div className="w-[20%] lg:flex hidden items-center">
              <DarkMode />
              {currentUser?._id ? (
                <UserDropdown />
              ) : (
                <div className="flex justify-between items-center">
                  <Button
                    color="primary"
                    className="ml-3 rounded-full text-[16px] text-white font-poppins"
                    onClick={() => navigate("/signin")}
                  >
                    Login
                  </Button>
                  <Button
                    className="ml-3 rounded-full text-[16px] text-black font-poppins"
                    onClick={() => navigate("/signup")}
                  >
                    Signup
                  </Button>
                </div>
              )}
            </div>
            {!isMenuVisible && (
              <div className="flex items-center lg:hidden">
                <DarkMode />
                {currentUser?._id && <UserDropdown />}
                <div
                  aria-label="open menu"
                  onClick={() => setMenuVisibility(true)}
                  className="ml-6"
                >
                  <AiOutlineMenu className="text-[30px]" />
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
        </div>
      </Container>
      <div
        className={`${
          isMenuVisible ? "flex ease-in-out duration-300" : "hidden"
        } lg:hidden absolute w-[100%] top-0 left-0 z-30 pt-[24px] bg-white h-screen`}
      >
        <div className="container mx-auto px-8">
          <div
            onClick={() => setMenuVisibility(false)}
            className="mt-[16px] outline-none float-right ease-in-out duration-300 rounded"
          >
            <HiOutlineX className="text-[30px]" />
          </div>
          <div data-aos="fade-down" className="grid mt-[50px]">
            <div>
              <Menu
                mode="inline"
                items={mobileNavItems}
                selectedKeys={[currentPath]}
                className="font-figtree"
                style={{
                  borderRight: "0px solid",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
