import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { logout } from "../../../redux/features/auth/authSlice";
import { Sidebar } from "../SideBar";
import { Button } from "../../atoms";

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
        <Header
          style={{
            justifyContent: "flex-end",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <Content style={{ padding: "24px 0", background: "white" }}>
          <div
            style={{
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

// import { Layout } from "antd";
// import { Outlet } from "react-router-dom";
// import { useAppDispatch } from "../../../redux/hooks";
// import { logout } from "../../../redux/features/auth/authSlice";
// import { Sidebar } from "../SideBar";
// import { Button, Container } from "../../atoms";
// import { useState } from "react";
// import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";

// const { Header, Content } = Layout;

// export const AdminDashboardLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   const dispatch = useAppDispatch();

//   const handleLogout = () => {
//     dispatch(logout());
//   };
//   return (
//     <Layout style={{ height: "100%" }}>
//       <Sidebar collapsed={collapsed} />
//       <Layout>
//         <Header
//           style={{
//             padding: 0,
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: "100%",
//           }}
//         >
//           <Container>
//             <div className="flex w-full justify-between">
//               <Button
//                 type="text"
//                 icon={
//                   collapsed ? (
//                     <AiOutlineMenuUnfold color="white" />
//                   ) : (
//                     <AiOutlineMenuFold color="white" />
//                   )
//                 }
//                 onClick={() => setCollapsed(!collapsed)}
//                 style={{
//                   fontSize: "16px",
//                   width: 64,
//                   height: 64,
//                 }}
//               />
//               <Button>Logout</Button>
//             </div>
//           </Container>
//         </Header>
//         <Content style={{ margin: "24px 0" }}>
//           <div
//             style={{
//               minHeight: 360,
//             }}
//           >
//             <Outlet />
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };
