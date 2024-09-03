import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { logout } from "../../../redux/features/auth/authSlice";
import { Sidebar } from "../SideBar";

const { Header, Content } = Layout;

export const AdminDashboardLayout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0 }}></Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
