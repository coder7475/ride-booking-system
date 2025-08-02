import type { Types } from "mongoose";
import type {
	DriverApprovalStatus,
	DriverOnlineStatus,
	ILocation,
	IVehicleInfo,
} from "@/types/types";

export interface IDriver {
	userId: Types.ObjectId;
	approvalStatus: DriverApprovalStatus;
	onlineStatus: DriverOnlineStatus;
	driverLocation: ILocation;
	vehicleInfo: IVehicleInfo;
}
