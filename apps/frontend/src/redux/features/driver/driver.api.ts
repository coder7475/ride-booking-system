import { baseApi } from "@/redux/baseApi";
import type { DriverOnlineStatus } from "@/types/driver.types";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ///
    driverProfile: builder.query({
      query: () => ({
        url: "/drivers/me",
        method: "GET",
      }),
    }),
    ///
    applyForDriver: builder.mutation({
      query: (driverInfo) => ({
        url: "/drivers/apply",
        method: "POST",
        data: driverInfo,
      }),
    }),
    ///
    updateDriverStatus: builder.mutation({
      query: (status: { onlineStatus: DriverOnlineStatus }) => ({
        url: "/drivers/me/status",
        method: "PATCH",
        data: status,
      }),
    }),
    ///
  }),
});

export const {
  useDriverProfileQuery,
  useApplyForDriverMutation,
  useUpdateDriverStatusMutation,
} = driverApi;
