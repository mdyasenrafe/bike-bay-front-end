import React, { useEffect, useState } from "react";
import { Container } from "../../atoms";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import { Menu } from "antd";
import { generateNavItems } from "../../../utils";
import { appRoutes } from "../../../routes/appRoutes";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineX } from "react-icons/hi";

export const Navbar = () => {
  const [isMenuVisible, setMenuVisibility] = useState<boolean>(false);
  const [isHeaderFixed, setHeaderFixed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleHeaderChange = () => {
      if (window.scrollY > 10) {
        setHeaderFixed(true);
      } else {
        setHeaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleHeaderChange);
    return () => {
      window.removeEventListener("scroll", handleHeaderChange);
    };
  }, []);

  const navItems = generateNavItems(appRoutes);

  return (
    <React.Fragment>
      <Container>
        <div className={` min-w-full transition-all delay-75 ease-in-out py-2`}>
          <div className="flex justify-between items-center w-full">
            <div className="ml-3 w-[30%]">
              <NavLink to="/" className="flex items-center">
                <img
                  className="h-[50px] py-1 cursor-pointer"
                  src={Logo}
                  alt="Logo"
                />
              </NavLink>
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex w-[70%]">
              <Menu
                style={{
                  width: "100%",
                  justifyContent: "end",
                  borderBottom: "0px solid",
                }}
                mode="horizontal"
                items={navItems}
                selectedKeys={[currentPath]}
              />
            </div>
            {!isMenuVisible && (
              <div
                aria-label="open menu"
                onClick={() => setMenuVisibility(true)}
                className={`${
                  !isHeaderFixed && "text-black"
                } outline-none rounded ease-in-out duration-300 focus:ring-gray-600 lg:hidden`}
              >
                <AiOutlineMenu className="text-[30px]" />
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
            <div className="grid gap-5 text-lg">
              <Menu
                mode="inline"
                items={navItems}
                selectedKeys={[currentPath]}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
