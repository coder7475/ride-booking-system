import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    driverProfile: builder.query({
      query: () => ({
        url: "/drivers/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useDriverProfileQuery } = driverApi;
