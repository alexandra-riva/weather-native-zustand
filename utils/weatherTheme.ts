// utils/weatherTheme.ts

export type WeatherTheme = {
  gradient: string[];
  emoji: string;
};

/**
 * - Weather decides color family
 * - Temperature decides warm vs cold
 * - Night only darkens the colors
 */
export function getWeatherTheme(
  condition: string,
  temp: number,
  isNight: boolean
): WeatherTheme {
  const c = condition.toLowerCase();

  // Rain
  if (c.includes("rain") || c.includes("drizzle") || c.includes("storm")) {
    return {
      emoji: "🌧️",
      gradient: isNight
        ? ["#0f172a", "#1e293b"]
        : ["#64748b", "#94a3b8"],
    };
  }

  // Snow
  if (c.includes("snow") || c.includes("sleet")) {
    return {
      emoji: "❄️",
      gradient: isNight
        ? ["#1e293b", "#334155"]
        : ["#e5e7eb", "#cbd5e1"],
    };
  }

  // Clear / Sunny
  if (c.includes("sun") || c.includes("clear")) {
    // Cold sunny (e.g. -13)
    if (temp < 5) {
      return {
        emoji: "☀️",
        gradient: isNight
          ? ["#0f172a", "#1e3a8a"]
          : ["#dbeafe", "#93c5fd"],
      };
    }

    // Hot sunny (e.g. 30)
    if (temp > 25) {
      return {
        emoji: "☀️",
        gradient: isNight
          ? ["#7c2d12", "#92400e"]
          : ["#fde68a", "#f59e0b"],
      };
    }

    // Mild sunny
    return {
      emoji: "☀️",
      gradient: isNight
        ? ["#312e81", "#1e293b"]
        : ["#fef3c7", "#fbbf24"],
    };
  }

  // Cloudy (default)
  return {
    emoji: "☁️",
    gradient: isNight
      ? ["#1e293b", "#020617"]
      : ["#e5e7eb", "#9ca3af"],
  };
}