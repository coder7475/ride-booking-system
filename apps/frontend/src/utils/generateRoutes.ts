import type { ComponentType } from "react";

export interface ISidebarRoutes {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
export const generateRoutes = (sidebarItems: ISidebarRoutes[]) => {
  return sidebarItems.flatMap((section) =>
    section.items.map((route) => ({
      path: route.url,
      Component: route.component,
    })),
  );
};
