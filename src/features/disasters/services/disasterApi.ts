import { PHILIPPINES_BOUNDS } from "../../../shared/constants/config";
import { fetchFloodData } from "../../weather/services/floodApi";
import {
  mockDamStatus,
  mockFloodAlerts,
  mockTsunamiAlerts,
  mockVolcanicEruptions,
} from "../mockData/disasterMockData";
import {
  DamStatus,
  DisasterSummary,
  Earthquake,
  FloodAlert,
  FloodData,
  TsunamiAlert,
  VolcanicEruption,
} from "../types";

// USGS Earthquake API
export const fetchEarthquakes = async (): Promise<Earthquake[]> => {
  const endTime = new Date().toISOString().split("T")[0];
  const startTime = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0]; // Last 30 days

  const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime}&endtime=${endTime}&minlatitude=${PHILIPPINES_BOUNDS.minLat}&maxlatitude=${PHILIPPINES_BOUNDS.maxLat}&minlongitude=${PHILIPPINES_BOUNDS.minLng}&maxlongitude=${PHILIPPINES_BOUNDS.maxLng}&minmagnitude=2.0&orderby=time`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch earthquake data");
    }
    const data = await response.json();
    return data.features || [];
  } catch (error) {
    console.error("Error fetching earthquakes:", error);
    return [];
  }
};

// Real flood data from Open-Meteo API
export const fetchFloodAlerts = async (): Promise<FloodAlert[]> => {
  try {
    const floodData: FloodData[] = await fetchFloodData();

    // Convert FloodData to FloodAlert format
    return floodData
      .filter((flood) => flood.severity !== "low" && flood.status !== "normal")
      .map((flood) => ({
        id: flood.id,
        location: flood.location,
        severity: flood.severity,
        status:
          flood.status === "watch"
            ? "watch"
            : flood.status === "advisory"
            ? "advisory"
            : flood.status === "warning"
            ? "warning"
            : "active",
        description: flood.description,
        timestamp: flood.timestamp,
        coordinates: flood.coordinates,
        affectedAreas: flood.affectedAreas,
        waterLevel: flood.waterLevel,
        unit: flood.unit,
      }));
  } catch (error) {
    console.error("Error fetching flood alerts:", error);
    // Fallback to mock data
    return mockFloodAlerts;
  }
};

export const fetchTsunamiAlerts = async (): Promise<TsunamiAlert[]> => {
  // Mock data - in a real app, you'd integrate with tsunami warning systems
  return mockTsunamiAlerts;
};

export const fetchVolcanicEruptions = async (): Promise<VolcanicEruption[]> => {
  // Mock data - in a real app, you'd integrate with PHIVOLCS
  return mockVolcanicEruptions;
};

export const fetchDamStatus = async (): Promise<DamStatus[]> => {
  // Mock data - in a real app, you'd integrate with NWRB or local dam authorities
  return mockDamStatus;
};

export const fetchDisasterSummary = async (): Promise<DisasterSummary> => {
  try {
    const [earthquakes, floods, tsunamis, volcanic, dams] = await Promise.all([
      fetchEarthquakes(),
      fetchFloodAlerts(),
      fetchTsunamiAlerts(),
      fetchVolcanicEruptions(),
      fetchDamStatus(),
    ]);

    const total =
      earthquakes.length +
      floods.length +
      tsunamis.length +
      volcanic.length +
      dams.length;

    return {
      total,
      byType: {
        earthquake: earthquakes.length,
        flood: floods.length,
        tsunami: tsunamis.length,
        volcanic: volcanic.length,
        dam: dams.length,
        weather: 0, // Weather alerts are separate from disaster summary
      },
      bySeverity: {
        low: tsunamis.filter((t) => t.severity === "low").length,
        moderate: floods.filter((f) => f.severity === "moderate").length,
        high:
          floods.filter((f) => f.severity === "high").length +
          earthquakes.filter((e) => e.properties.mag >= 5.0).length,
        extreme: earthquakes.filter((e) => e.properties.mag >= 7.0).length,
      },
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching disaster summary:", error);
    return {
      total: 0,
      byType: {
        earthquake: 0,
        flood: 0,
        tsunami: 0,
        volcanic: 0,
        dam: 0,
        weather: 0,
      },
      bySeverity: {
        low: 0,
        moderate: 0,
        high: 0,
        extreme: 0,
      },
      lastUpdated: new Date().toISOString(),
    };
  }
};
