const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

if (!API_KEY) {
  throw new Error("Missing Visual Crossing API key");
}

export async function fetchWeather(city: string) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
    city
  )}?unitGroup=metric&key=${API_KEY}&contentType=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }

  return response.json();
}