import { Layout, Menu } from "antd";
import { useAppSelector } from "../../../redux/hooks";
import {
  getCurrentUser,
  useCurrentToken,
} from "../../../redux/features/auth/authSlice";
import { MenuItemType } from "antd/es/menu/interface";
import { sidebarItemsGenerator, verifyToken } from "../../../utils";
import { TAppRoute, adminRoutes } from "../../../routes";
import { Text } from "../../atoms";
import { NavLink, useLocation } from "react-router-dom";
import { TUser } from "../../../redux/features/auth";
import Logo from "../../../assets/images/logo.png";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
};

export const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const token = useAppSelector(useCurrentToken);
  let user;
  let sidebarItems;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  let role = user?.role;

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminRoutes as TAppRoute[]);
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NavLink to={"/"}>
          <img className="h-[50px] py-1 cursor-pointer" src={Logo} alt="Logo" />
        </NavLink>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        items={sidebarItems as MenuItemType[]}
        className="font-figtree"
        selectedKeys={[currentPath]}
      />
    </Sider>
  );
};

// import { Layout, Menu } from "antd";
// import { useAppSelector } from "../../../redux/hooks";
// import {
//   getCurrentUser,
//   useCurrentToken,
// } from "../../../redux/features/auth/authSlice";
// import { MenuItemType } from "antd/es/menu/interface";
// import { sidebarItemsGenerator, verifyToken } from "../../../utils";
// import { TAppRoute, adminRoutes } from "../../../routes";
// import { Text } from "../../atoms";
// import { NavLink, useLocation } from "react-router-dom";
// import { TUser } from "../../../redux/features/auth";
// import Logo from "../../../assets/images/logo.png";

// const { Sider } = Layout;

// const userRole = {
//   ADMIN: "admin",
// };

// export const Sidebar = () => {
//   const location = useLocation();
//   const currentPath = location.pathname;

//   const token = useAppSelector(useCurrentToken);
//   let user;
//   let sidebarItems;

//   if (token) {
//     user = verifyToken(token) as TUser;
//   }

//   let role = user?.role;

//   switch (role) {
//     case userRole.ADMIN:
//       sidebarItems = sidebarItemsGenerator(adminRoutes as TAppRoute[]);
//       break;

//     default:
//       break;
//   }

//   return (
//     <Sider
//       breakpoint="lg"
//       collapsedWidth="0"
//       onBreakpoint={(broken) => {
//         console.log(broken);
//       }}
//       onCollapse={(collapsed, type) => {
//         console.log(collapsed, type);
//       }}
//       style={{
//         height: "100vh",
//         position: "sticky",
//         top: 0,
//         left: 0,
//       }}
//     >
//       <div
//         style={{
//           color: "white",
//           height: "4rem",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <NavLink to={"/"}>
//           <img className="h-[50px] py-1 cursor-pointer" src={Logo} alt="Logo" />
//         </NavLink>
//       </div>
//       <Menu
//         theme="dark"
//         mode="inline"
//         items={sidebarItems as MenuItemType[]}
//         className="font-figtree"
//         selectedKeys={[currentPath]}
//       />
//     </Sider>
//   );
// };
