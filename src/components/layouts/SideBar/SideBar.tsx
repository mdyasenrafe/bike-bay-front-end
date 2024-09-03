import { Layout, Menu } from "antd";
import { useAppSelector } from "../../../redux/hooks";
import { getCurrentUser } from "../../../redux/features/auth/authSlice";
import { MenuItemType } from "antd/es/menu/interface";
import { sidebarItemsGenerator } from "../../../utils";
import { TAppRoute, adminRoutes } from "../../../routes";
import { Text } from "../../atoms";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
};

export const Sidebar = () => {
  const user = useAppSelector(getCurrentUser);
  const role = user?.role;
  let sidebarItems;

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
        <Text className="text-white">ADU</Text>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems as MenuItemType[]}
        className="font-figtree"
      />
    </Sider>
  );
};
