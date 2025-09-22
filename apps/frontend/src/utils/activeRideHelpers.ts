import { CheckCircle, Navigation, User } from "lucide-react";

// Utility: Map backend rideStatus to UI status keys
export const mapRideStatus = (rideStatus: string) => {
  switch (rideStatus) {
    case "ACCEPTED":
      return "accepted";
    case "PICKED_UP":
      return "picked_up";
    case "IN_TRANSIT":
      return "in_transit";
    case "COMPLETED":
      return "completed";
    case "CANCELLED":
      return "cancelled";
    default:
      return rideStatus.toLowerCase();
  }
};

export const statusSteps = [
  { key: "accepted", label: "Accepted", icon: CheckCircle },
  { key: "picked_up", label: "Picked Up", icon: User },
  { key: "in_transit", label: "In Transit", icon: Navigation },
  { key: "completed", label: "Completed", icon: CheckCircle },
];

export const getStatusIndex = (status: string) => {
  return statusSteps.findIndex((step) => step.key === status);
};

export const formatDateTime = (isoString?: string) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatFare = (fare: number) => {
  // Assuming fare is in cents or integer currency
  if (typeof fare !== "number") return "-";
  // If fare is in cents, divide by 100. Here, we assume it's in BDT or similar.
  return `$${fare.toLocaleString()}`;
};
