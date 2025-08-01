import { FareConfig, ILocation } from "@/types/types";

const EARTH_RADIUS_KM = 6371; // Radius of Earth in km
const toRadians = (deg: number) => (deg * Math.PI) / 180;

// straight line distance between two location
export const calculateHaversineDistance = (
  from: ILocation,
  to: ILocation,
): number => {
  // Convert latitude and longitude from degrees to radians
  const lat1 = toRadians(from.latitude);
  const lon1 = toRadians(from.longitude);
  const lat2 = toRadians(to.latitude);
  const lon2 = toRadians(to.longitude);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
};

const baseConfig: FareConfig = {
  baseFare: 50,
  perKmRate: 25,
  minimumFare: 100,
};

export const calculateFareEstimate = (
  pickup: ILocation,
  destination: ILocation,
  config: FareConfig = baseConfig,
): number => {
  const distanceKm = calculateHaversineDistance(pickup, destination);
  const fare = Math.round(config.baseFare + distanceKm * config.perKmRate);

  return Math.max(fare, config.minimumFare ?? 0);
};
