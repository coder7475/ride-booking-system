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

    rideDetails: builder.query({
      query: (id: string) => ({
        url: `/rides/${id}`,
        method: "GET",
      }),
    }),

    cancelRide: builder.mutation({
      query: (id: string) => ({
        url: `/rides/${id}/cancel`,
        method: "PATCH",
      }),
    }),

    getNearbyRideRequests: builder.query({
      query: ({ lat, lon, radius }) => ({
        url: "/rides/requests/nearby",
        method: "GET",
        params: {
          lat,
          lon,
          radius,
        },
      }),
    }),

    acceptRide: builder.mutation({
      query: (id: string) => ({
        url: `/rides/${id}/accept`,
        method: "PATCH",
      }),
    }),

    pickedUpRide: builder.mutation({
      query: (id: string) => ({
        url: `/rides/${id}/picked`,
        method: "PATCH",
      }),
    }),

    inTransitRide: builder.mutation({
      query: (id: string) => ({
        url: `/rides/${id}/transit`,
        method: "PATCH",
      }),
    }),

    completeRide: builder.mutation({
      query: (id: string) => ({
        url: `/rides/${id}/complete`,
        method: "PATCH",
      }),
    }),

    getActiveRides: builder.query({
      query: () => ({
        url: "/rides/activeRides",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useEstimateFareQuery,
  useRideHistoryQuery,
  useRideRequestMutation,
  useRideDetailsQuery,
  useCancelRideMutation,
  useGetNearbyRideRequestsQuery,
  useAcceptRideMutation,
  useInTransitRideMutation,
  usePickedUpRideMutation,
  useCompleteRideMutation,
  useGetActiveRidesQuery,
} = ridesApi;
