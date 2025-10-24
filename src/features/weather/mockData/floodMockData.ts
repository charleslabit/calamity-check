import { FloodData } from "../../disasters/types";

/**
 * Mock data for flood-related APIs
 * This file contains all the mock data that was previously embedded in the API files
 */

// Major rivers in Philippines for flood monitoring
export const PHILIPPINES_RIVERS = [
  { name: "Pasig River", lat: 14.5995, lng: 120.9842, city: "Manila" },
  { name: "Marikina River", lat: 14.65, lng: 121.1, city: "Marikina" },
  { name: "Cagayan River", lat: 17.6, lng: 121.7, city: "Cagayan" },
  { name: "Agno River", lat: 15.9, lng: 120.2, city: "Pangasinan" },
  { name: "Pampanga River", lat: 15.0, lng: 120.7, city: "Pampanga" },
  { name: "Bicol River", lat: 13.4, lng: 123.4, city: "Bicol" },
  { name: "Cebu River", lat: 10.3157, lng: 123.8854, city: "Cebu City" },
  { name: "Davao River", lat: 7.1907, lng: 125.4553, city: "Davao City" },
];

// Enhanced mock data generator for fallback
export function generateMockFloodData(): FloodData[] {
  const floodData = [
    {
      id: "flood-mock-1",
      location: "Pasig River, Manila",
      severity: "high" as const,
      status: "warning" as const,
      description:
        "Heavy rainfall from Tropical Depression Salome causing elevated water levels in Pasig River. Flood warning issued for low-lying areas.",
      timestamp: new Date().toISOString(),
      coordinates: { lat: 14.5995, lng: 120.9842 },
      affectedAreas: ["Manila", "Pasig", "Taguig", "Makati"],
      waterLevel: 150.5,
      unit: "m³/s",
      forecast: {
        next24h: 180.2,
        trend: "rising" as const,
      },
      dataSource: "mock" as const,
    },
    {
      id: "flood-mock-2",
      location: "Marikina River, Marikina",
      severity: "moderate" as const,
      status: "advisory" as const,
      description:
        "Moderate water levels in Marikina River. Residents advised to monitor conditions.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      coordinates: { lat: 14.65, lng: 121.1 },
      affectedAreas: ["Marikina", "Quezon City"],
      waterLevel: 85.3,
      unit: "m³/s",
      forecast: {
        next24h: 92.1,
        trend: "rising" as const,
      },
      dataSource: "mock" as const,
    },
    {
      id: "flood-mock-3",
      location: "Cagayan River, Cagayan",
      severity: "low" as const,
      status: "watch" as const,
      description:
        "Normal water levels with slight increase due to upstream rainfall.",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      coordinates: { lat: 17.6, lng: 121.7 },
      affectedAreas: ["Cagayan Valley"],
      waterLevel: 45.8,
      unit: "m³/s",
      forecast: {
        next24h: 48.2,
        trend: "stable" as const,
      },
      dataSource: "mock" as const,
    },
  ];

  return floodData;
}
