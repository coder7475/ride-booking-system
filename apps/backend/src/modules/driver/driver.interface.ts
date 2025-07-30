import {
  DriverApprovalStatus,
  DriverOnlineStatus,
  IDriverLocation,
} from "@/types/types";

export interface IDriver {
  driver_id: string;
  user_id: string;
  approval_status: DriverApprovalStatus;
  online_status: DriverOnlineStatus;
  driver_location: IDriverLocation;
  vehicle_info: string;
}
