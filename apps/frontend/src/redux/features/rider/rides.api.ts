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
      // Remove providesTags if not used, or provide a relevant tag if needed
    }),
    rideRequest: builder.mutation({
      query: (rideInfo) => ({
        url: "/rides/request",
        method: "POST",
        data: rideInfo,
      }),
      // Add invalidatesTags if you want to refetch queries after mutation
    }),
  }),
});

export const { useEstimateFareQuery, useRideRequestMutation } = ridesApi;
