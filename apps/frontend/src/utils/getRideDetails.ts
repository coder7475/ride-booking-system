import { type AddressCacheState, type IRide } from "@/types/ride.types";
import { format } from "date-fns";

export function getRideDetails(ride: IRide, addressCache: AddressCacheState) {
  // Pickup and destination keys for address cache
  const pickupKey = ride?.pickupLocation
    ? `${ride.pickupLocation.latitude},${ride.pickupLocation.longitude}`
    : "";
  const destKey = ride?.destinationLocation
    ? `${ride?.destinationLocation.latitude},${ride?.destinationLocation.longitude}`
    : "";

  // Format date and time for requested
  const requestedAt = ride?.timestamps?.requested
    ? new Date(ride?.timestamps.requested)
    : null;
  const dateStr = requestedAt ? format(requestedAt, "PPP") : "--";
  const timeStr = requestedAt ? format(requestedAt, "p") : "--";

  // Pickup and destination addresses or coordinates
  const pickup =
    addressCache && pickupKey && addressCache[pickupKey]
      ? addressCache[pickupKey]
      : ride?.pickupLocation &&
          ride?.pickupLocation.latitude &&
          ride?.pickupLocation.longitude
        ? `${ride?.pickupLocation.latitude}, ${ride?.pickupLocation.longitude}`
        : "--";
  const destination =
    addressCache && destKey && addressCache[destKey]
      ? addressCache[destKey]
      : ride?.destinationLocation &&
          ride?.destinationLocation.latitude &&
          ride?.destinationLocation.longitude
        ? `${ride?.destinationLocation.latitude}, ${ride?.destinationLocation.longitude}`
        : "--";

  // Fare
  const fareEstimated = ride?.fareEstimated ?? "--";
  const fareFinal = ride?.fareFinal ?? "--";
  const fareDisplay =
    typeof fareFinal === "number" && fareFinal > 0 ? fareFinal : fareEstimated;

  // Status
  const status = ride?.rideStatus ?? "--";

  // Timeline: requested, accepted, completed (if present)
  const timeline: Array<{ event: string; time: string; status: string }> = [];

  // Requested
  if (ride?.timestamps?.requested) {
    const requestedDate = new Date(ride.timestamps.requested);
    timeline.push({
      event: "Requested",
      time: format(requestedDate, "PPP, p"),
      status: "completed",
    });
  }

  // Accepted
  if (ride?.timestamps?.accepted) {
    const acceptedDate = new Date(ride.timestamps.accepted);
    timeline.push({
      event: "Accepted",
      time: format(acceptedDate, "PPP, p"),
      status: "completed",
    });
  }

  // Completed
  // Try to use timestamps.completed, fallback to rideStatus === "COMPLETED" and updatedAt
  if (ride?.timestamps?.completed) {
    const completedDate = new Date(ride.timestamps.completed);
    timeline.push({
      event: "Completed",
      time: format(completedDate, "PPP, p"),
      status: "completed",
    });
  }

  return {
    ride,
    pickupKey,
    destKey,
    requestedAt,
    dateStr,
    timeStr,
    pickup,
    destination,
    fareEstimated,
    fareFinal,
    fareDisplay,
    status,
    timeline,
  };
}
