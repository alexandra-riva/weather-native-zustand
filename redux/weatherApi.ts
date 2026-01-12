import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://weather.visualcrossing.com/",
  }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query<any, string>({
      query: (city) =>
        `VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
          city
        )}?unitGroup=metric&key=${API_KEY}&contentType=json`,
    }),
  }),
});

export const { useGetWeatherByCityQuery } = weatherApi;