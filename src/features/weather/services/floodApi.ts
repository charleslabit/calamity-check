import { FloodAlert, FloodData } from "../../disasters/types";
import {
  PHILIPPINES_RIVERS,
  generateMockFloodData,
} from "../mockData/floodMockData";

// Open-Meteo Flood API - FREE
const OPEN_METEO_FLOOD_BASE_URL = "https://flood-api.open-meteo.com/v1/flood";

export interface FloodApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  daily_units: {
    river_discharge: string;
  };
  daily: {
    time: string[];
    river_discharge: number[];
  };
}

export const fetchFloodData = async (): Promise<FloodData[]> => {
  try {
    const floodPromises = PHILIPPINES_RIVERS.map(async (river) => {
      const today = new Date().toISOString().split("T")[0];
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

      const url = `${OPEN_METEO_FLOOD_BASE_URL}?latitude=${river.lat}&longitude=${river.lng}&daily=river_discharge&start_date=${today}&end_date=${tomorrow}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Flood API error: ${response.status}`);
      }

      const data: FloodApiResponse = await response.json();

      const currentDischarge = data.daily.river_discharge[0] || 0;
      const forecastDischarge =
        data.daily.river_discharge[1] || currentDischarge;

      // Determine flood risk based on discharge levels
      const getFloodRisk = (
        discharge: number
      ): "low" | "moderate" | "high" | "extreme" => {
        if (discharge < 50) return "low";
        if (discharge < 100) return "moderate";
        if (discharge < 200) return "high";
        return "extreme";
      };

      const getFloodStatus = (
        discharge: number
      ): "normal" | "watch" | "advisory" | "warning" => {
        if (discharge < 50) return "normal";
        if (discharge < 100) return "watch";
        if (discharge < 200) return "advisory";
        return "warning";
      };

      const getFloodTrend = (
        current: number,
        forecast: number
      ): "rising" | "falling" | "stable" => {
        if (forecast > current) return "rising";
        if (forecast < current) return "falling";
        return "stable";
      };

      return {
        id: `flood-${river.name.toLowerCase().replace(/\s+/g, "-")}`,
        location: `${river.name}, ${river.city}`,
        severity: getFloodRisk(currentDischarge),
        status: getFloodStatus(currentDischarge),
        description: `River discharge: ${currentDischarge.toFixed(1)} m³/s. ${
          getFloodStatus(currentDischarge) === "normal"
            ? "Normal water levels"
            : "Elevated water levels detected"
        }.`,
        timestamp: new Date().toISOString(),
        coordinates: { lat: river.lat, lng: river.lng },
        affectedAreas: [river.city],
        waterLevel: currentDischarge,
        unit: "m³/s",
        forecast: {
          next24h: forecastDischarge,
          trend: getFloodTrend(currentDischarge, forecastDischarge),
        },
        dataSource: "real" as const,
      };
    });

    return await Promise.all(floodPromises);
  } catch (error) {
    console.error("Error fetching flood data:", error);
    return generateMockFloodData();
  }
};

// Get flood alerts based on current data
export const fetchFloodAlerts = async (): Promise<FloodAlert[]> => {
  const floodData = await fetchFloodData();

  return floodData
    .filter((flood) => flood.severity !== "low" && flood.status !== "normal")
    .map((flood) => ({
      id: `alert-${flood.id}`,
      location: flood.location,
      severity: flood.severity,
      status: flood.status === "normal" ? "active" : flood.status,
      description: flood.description,
      timestamp: flood.timestamp,
      coordinates: flood.coordinates,
      affectedAreas: flood.affectedAreas,
      waterLevel: flood.waterLevel,
      unit: flood.unit,
    }));
};
