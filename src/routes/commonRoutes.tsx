import { Signin, Signup } from "../pages/auth";
import { Home, About, BikeDetail, PaymentSuccess } from "../pages/main";

export const commonRoutes = [
  {
    id: 1,
    name: "Home",
    path: "/",
    component: <Home />,
    isNavItem: true,
  },
  {
    id: 2,
    name: "About",
    path: "/about",
    component: <About />,
    isNavItem: true,
  },
  {
    id: 3,
    name: "signup",
    path: "/signup",
    component: <Signup />,
    isNavItem: false,
  },
  {
    id: 4,
    name: "signin",
    path: "/signin",
    component: <Signin />,
    isNavItem: false,
  },
  {
    id: 5,
    name: "bike-detail",
    path: "/bike-detail/:productId",
    component: <BikeDetail />,
    isNavItem: false,
  },
  {
    id: 8,
    name: "success",
    path: "/payment-success",
    component: <PaymentSuccess />,
    isNavItem: false,
  },
];
