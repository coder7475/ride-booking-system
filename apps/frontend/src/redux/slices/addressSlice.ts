import type { AddressCacheState } from "@/types/ride.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: AddressCacheState = {};

const addressSlice = createSlice({
  name: "addressCache",
  initialState,
  reducers: {
    setAddress: (
      state,
      action: PayloadAction<{ key: string; value: string }>,
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    setAddresses: (state, action: PayloadAction<Record<string, string>>) => {
      Object.assign(state, action.payload);
    },
    clearAddresses: () => initialState,
  },
});

export const { setAddress, setAddresses, clearAddresses } =
  addressSlice.actions;
export default addressSlice.reducer;
