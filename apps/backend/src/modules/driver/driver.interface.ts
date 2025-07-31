import {
  DriverApprovalStatus,
  DriverOnlineStatus,
  ILocation,
  IVehicleInfo,
} from "@/types/types";
import { Types } from "mongoose";

export interface IDriver {
  userId: Types.ObjectId;
  approvalStatus: DriverApprovalStatus;
  onlineStatus: DriverOnlineStatus;
  driverLocation: ILocation;
  vehicleInfo: IVehicleInfo;
}
