import { DriverOnlineStatus } from "@/types/driver.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DriverState {
  onlineStatus: DriverOnlineStatus;
}

const initialState: DriverState = {
  onlineStatus: DriverOnlineStatus.OFFLINE,
};

const driverSlice = createSlice({
  name: "driverStates",
  initialState,
  reducers: {
    setOnlineStatus: (state, action: PayloadAction<DriverOnlineStatus>) => {
      state.onlineStatus = action.payload;
    },
    resetDriverState: () => initialState,
  },
});

export const { setOnlineStatus, resetDriverState } = driverSlice.actions;
export default driverSlice.reducer;
