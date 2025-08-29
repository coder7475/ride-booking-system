import type { ISidebarRoutes } from "@/types";

export const generateRoutes = (sidebarItems: ISidebarRoutes[]) => {
  return sidebarItems.flatMap((section) =>
    section.items.map((route) => ({
      path: route.url,
      Component: route.component,
    })),
  );
};
