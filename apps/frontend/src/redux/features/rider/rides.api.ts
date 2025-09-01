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
      providesTags: [],
    }),
  }),
});

export const { useEstimateFareQuery } = ridesApi;
