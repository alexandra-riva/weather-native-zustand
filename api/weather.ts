/**
 * DEPRECATED
 * This file was used for manual fetch-based API calls.
 * Weather data is now fetched using Redux Toolkit Query
 * in redux/weatherApi.ts.
 */

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

export async function searchCities(query: string) {
  if (!query.trim()) return [];

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
    query
  )}?unitGroup=metric&key=${API_KEY}&contentType=json`;

  const response = await fetch(url);

  if (!response.ok) {
    return [];
  }

  const data = await response.json();

  // Visual Crossing returns a resolved address
  if (data?.resolvedAddress) {
    return [data.resolvedAddress];
  }

  return [];
}