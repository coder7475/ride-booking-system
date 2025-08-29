import { adminSideRoutes } from "@/router/adminSideRoutes";
import { driverSideRoutes } from "@/router/driverSideRoutes";
import { userSideRoutes } from "@/router/userSideRoutes";
import { Role } from "@/types/auth.types";

export const getSideBarLinks = (currentRole: Role) => {
  if (currentRole === Role.ADMIN) {
    return [...adminSideRoutes];
  } else if (currentRole === Role.DRIVER) {
    return [...driverSideRoutes];
  } else if (currentRole === Role.USER) {
    return [...userSideRoutes];
  } else {
    return [];
  }
};
