// Helper: Fetch address from lat/lng
export const fetchAddress = async (lat: number, lng: number) => {
  const API_KEY = import.meta.env.VITE_GEOCODING_API_KEY;

  // Small delay for rate limiting
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await fetch(
    `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=${API_KEY}`,
  );

  const data = await res.json();

  if (data?.display_name) {
    return `${data?.address?.road ?? ""}, ${data?.address?.city ?? ""}`;
  }

  return null;
};
