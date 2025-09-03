import { baseApi } from "@/redux/baseApi";

export const ridesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    estimateFare: builder.query({
      query: ({ pickupLat, pickupLng, destLat, destLng }) => ({
        url: "/rides/fare",
        method: "GET",
        params: {
          pickupLat,
          pickupLng,
          destLat,
          destLng,
        },
      }),
    }),
    rideHistory: builder.query({
      query: () => ({
        url: "/rides/me",
        method: "GET",
      }),
    }),
    rideRequest: builder.mutation({
      query: (rideInfo) => ({
        url: "/rides/request",
        method: "POST",
        data: rideInfo,
      }),
    }),
  }),
});

export const {
  useEstimateFareQuery,
  useRideHistoryQuery,
  useRideRequestMutation,
} = ridesApi;
