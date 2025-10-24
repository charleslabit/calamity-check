import {
  PHILIPPINES_CITIES,
  generateMockWeatherData,
  mockWeatherAlerts,
} from "../mockData/weatherMockData";
import { WeatherAlert, WeatherData } from "../types";

// OpenWeatherMap API - FREE TIER
const OPENWEATHER_API_KEY =
  process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "demo";
const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchCurrentWeather = async (
  cityName?: string
): Promise<WeatherData[]> => {
  console.log(OPENWEATHER_API_KEY);
  if (OPENWEATHER_API_KEY === "demo") {
    // Return mock data if no API key
    return generateMockWeatherData();
  }

  try {
    const cities = cityName
      ? PHILIPPINES_CITIES.filter((city) =>
          city.name.toLowerCase().includes(cityName.toLowerCase())
        )
      : PHILIPPINES_CITIES.slice(0, 5); // Limit to 5 cities for free tier

    const weatherPromises = cities.map(async (city) => {
      const url = `${OPENWEATHER_BASE_URL}/weather?lat=${city.lat}&lon=${city.lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        id: `weather-${city.name.toLowerCase().replace(" ", "-")}`,
        city: city.name,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        visibility: data.visibility / 1000, // Convert to km
        uvIndex: data.uvi || 0,
        timestamp: new Date().toISOString(),
        coordinates: { lat: city.lat, lng: city.lon },
        dataSource: "real" as const,
      };
    });

    return await Promise.all(weatherPromises);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return generateMockWeatherData();
  }
};

// Weather alerts based on PAGASA data (mock implementation)
export const fetchWeatherAlerts = async (): Promise<WeatherAlert[]> => {
  // Mock data based on current PAGASA alerts
  return mockWeatherAlerts;
};
