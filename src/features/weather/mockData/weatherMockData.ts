import { WeatherAlert, WeatherData } from "../types";

/**
 * Mock data for weather-related APIs
 * This file contains all the mock data that was previously embedded in the API files
 */

// Major cities in Philippines for weather data
export const PHILIPPINES_CITIES = [
  { name: "Manila", lat: 14.5995, lon: 120.9842 },
  { name: "Cebu City", lat: 10.3157, lon: 123.8854 },
  { name: "Davao City", lat: 7.1907, lon: 125.4553 },
  { name: "Quezon City", lat: 14.676, lon: 121.0437 },
  { name: "Makati", lat: 14.5547, lon: 121.0244 },
  { name: "Taguig", lat: 14.5176, lon: 121.0509 },
  { name: "Pasig", lat: 14.5764, lon: 121.0851 },
  { name: "Cagayan de Oro", lat: 8.4808, lon: 124.7461 },
  { name: "Iloilo City", lat: 10.7202, lon: 122.5621 },
  { name: "Bacolod", lat: 10.6407, lon: 122.9689 },
];

// Mock weather data generator
export function generateMockWeatherData(): WeatherData[] {
  const conditions = ["sunny", "cloudy", "rainy", "stormy", "foggy"];
  const descriptions = [
    "Clear sky",
    "Partly cloudy",
    "Light rain",
    "Heavy rain",
    "Thunderstorm",
    "Fog",
  ];

  return PHILIPPINES_CITIES.slice(0, 5).map((city, index) => ({
    id: `weather-${city.name.toLowerCase().replace(" ", "-")}`,
    city: city.name,
    temperature: 25 + Math.floor(Math.random() * 10),
    feelsLike: 25 + Math.floor(Math.random() * 10),
    humidity: 60 + Math.floor(Math.random() * 30),
    pressure: 1010 + Math.floor(Math.random() * 20),
    windSpeed: Math.round(Math.random() * 15 * 10) / 10, // Round to 1 decimal place
    windDirection: Math.floor(Math.random() * 360),
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    icon: `01d`,
    visibility: Math.round((8 + Math.random() * 4) * 10) / 10, // Round to 1 decimal place
    uvIndex: Math.floor(Math.random() * 11),
    timestamp: new Date().toISOString(),
    coordinates: { lat: city.lat, lng: city.lon },
    dataSource: "mock" as const,
  }));
}

// Mock weather alerts data
export const mockWeatherAlerts: WeatherAlert[] = [
  {
    id: "weather-1",
    type: "typhoon",
    severity: "high",
    title: "Tropical Depression Salome",
    description:
      "Tropical Depression Salome is affecting Northern Luzon with heavy rainfall and strong winds. Wind Signal No. 1 is in effect for Batanes and parts of Cagayan.",
    affectedAreas: ["Batanes", "Cagayan", "Ilocos Norte", "Ilocos Sur"],
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    coordinates: { lat: 22.7, lng: 123.2 },
    dataSource: "mock",
  },
  {
    id: "weather-2",
    type: "flood",
    severity: "moderate",
    title: "Flood Advisory for Metro Manila",
    description:
      "Heavy rainfall expected in Metro Manila and surrounding areas. Residents in low-lying areas are advised to take precautionary measures.",
    affectedAreas: ["Metro Manila", "Rizal", "Cavite", "Laguna"],
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    coordinates: { lat: 14.5995, lng: 120.9842 },
    dataSource: "mock",
  },
  {
    id: "weather-3",
    type: "thunderstorm",
    severity: "low",
    title: "Thunderstorm Watch",
    description:
      "Isolated thunderstorms are possible over Visayas and Mindanao in the afternoon and evening.",
    affectedAreas: ["Cebu", "Davao", "Iloilo", "Bacolod"],
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    coordinates: { lat: 10.3157, lng: 123.8854 },
    dataSource: "mock",
  },
];
