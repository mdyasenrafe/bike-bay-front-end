import { NavLink } from "react-router-dom";
import { TAppRoute } from "../routes";

type TSideBar =
  | {
      key: string;
      label: React.ReactNode;
      children?: TSideBar[];
    }
  | undefined;

export const sidebarItemsGenerator = (adminPaths: TAppRoute[]) => {
  return adminPaths.reduce((acc: TSideBar[], item) => {
    if (item.name && item.path && item.isSidebar) {
      acc.push({
        key: item.path,
        label: <NavLink to={`${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item?.name || "",
        label: item?.name,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.path as string,
              label: <NavLink to={`${child.path}`}>{child.name}</NavLink>,
            };
          }
        }),
      });
    }
    return acc;
  }, []);
};
