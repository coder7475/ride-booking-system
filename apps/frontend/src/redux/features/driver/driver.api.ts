import { baseApi } from "@/redux/baseApi";

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
  }),
});

export const { useDriverProfileQuery, useApplyForDriverMutation } = driverApi;
