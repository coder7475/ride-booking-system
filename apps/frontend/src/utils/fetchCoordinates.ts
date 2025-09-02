// Helper: Fetch lat/lng from address
export const fetchCoordinates = async (address: string) => {
  // Wait 1 second before each geocoding request for rate limiting
  const API_KEY = import.meta.env.VITE_GEOCODING_API_KEY;

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch(
    `https://geocode.maps.co/search?q=${encodeURIComponent(
      address,
    )}&api_key=${API_KEY}`,
  );
  const data = await res.json();
  // console.log(data[0]);

  if (data && data.length > 0) {
    return {
      lat: data[0].lat,
      lng: data[0].lon,
    };
  }

  return null;
};
