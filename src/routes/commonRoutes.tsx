import { Signin, Signup } from "../pages/auth";
import { Home, About, BikeDetail, PaymentSuccess, Bikes } from "../pages/main";
import { CompareProduct } from "../pages/main/CompareProduct";

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
  {
    id: 9,
    name: "Bikes",
    path: "/bikes",
    component: <Bikes />,
    isNavItem: true,
  },
  {
    id: 10,
    name: "Compare Bikes",
    path: "/compare-bikes",
    component: <CompareProduct />,
    isNavItem: false,
  },
];
