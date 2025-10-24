import {
  DamStatus,
  FloodAlert,
  TsunamiAlert,
  VolcanicEruption,
} from "../types";

/**
 * Mock data for disaster-related APIs
 * This file contains all the mock data that was previously embedded in the API files
 */

// Mock flood alerts data
export const mockFloodAlerts: FloodAlert[] = [
  {
    id: "flood-fallback-1",
    location: "Metro Manila",
    severity: "high" as const,
    status: "warning" as const,
    description:
      "Heavy rainfall from Tropical Depression Salome causing flooding in low-lying areas",
    timestamp: new Date().toISOString(),
    coordinates: { lat: 14.5995, lng: 120.9842 },
    affectedAreas: ["Quezon City", "Manila", "Caloocan", "Pasig", "Taguig"],
    waterLevel: 2.5,
    unit: "meters",
  },
];

// Mock tsunami alerts data
export const mockTsunamiAlerts: TsunamiAlert[] = [
  {
    id: "1",
    location: "Eastern Samar",
    severity: "low",
    status: "watch",
    description: "Tsunami watch issued following earthquake in Pacific",
    timestamp: new Date().toISOString(),
    coordinates: { lat: 11.5, lng: 125.5 },
    waveHeight: 0.5,
    unit: "meters",
    arrivalTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock volcanic eruptions data
export const mockVolcanicEruptions: VolcanicEruption[] = [
  {
    id: "1",
    volcanoName: "Mayon Volcano",
    location: "Albay Province",
    status: "warning",
    alertLevel: 2,
    description: "Mayon Volcano showing signs of increased activity",
    timestamp: new Date().toISOString(),
    coordinates: { lat: 13.2567, lng: 123.6857 },
    lastEruption: "2023-06-15",
    elevation: 2463,
    type: "Stratovolcano",
  },
  {
    id: "2",
    volcanoName: "Taal Volcano",
    location: "Batangas Province",
    status: "advisory",
    alertLevel: 1,
    description: "Taal Volcano under close monitoring",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    coordinates: { lat: 14.0106, lng: 121.0 },
    lastEruption: "2022-03-26",
    elevation: 311,
    type: "Caldera",
  },
];

// Mock dam status data
export const mockDamStatus: DamStatus[] = [
  {
    id: "1",
    damName: "Angat Dam",
    location: "Bulacan Province",
    status: "normal",
    waterLevel: 180.5,
    capacity: 200.0,
    percentage: 90.25,
    description: "Angat Dam operating within normal parameters",
    timestamp: new Date().toISOString(),
    coordinates: { lat: 14.9167, lng: 121.1833 },
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "2",
    damName: "Magat Dam",
    location: "Isabela Province",
    status: "caution",
    waterLevel: 185.2,
    capacity: 190.0,
    percentage: 97.47,
    description: "Magat Dam approaching capacity - monitoring required",
    timestamp: new Date().toISOString(),
    coordinates: { lat: 16.6667, lng: 121.5 },
    lastUpdate: new Date().toISOString(),
  },
];
