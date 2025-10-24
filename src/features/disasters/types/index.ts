export interface Earthquake {
  id: string;
  magnitude: number;
  place: string;
  time: number;
  updated: number;
  url: string;
  detail: string;
  felt: number | null;
  cdi: number | null;
  mmi: number | null;
  alert: string | null;
  status: string;
  tsunami: number;
  sig: number;
  net: string;
  code: string;
  ids: string;
  sources: string;
  types: string;
  nst: number | null;
  dmin: number | null;
  rms: number;
  gap: number | null;
  magType: string;
  type: string;
  title: string;
  geometry: {
    type: string;
    coordinates: [number, number, number]; // [longitude, latitude, depth]
  };
  properties: {
    mag: number;
    place: string;
    time: number;
    updated: number;
    tz: number | null;
    url: string;
    detail: string;
    felt: number | null;
    cdi: number | null;
    mmi: number | null;
    alert: string | null;
    status: string;
    tsunami: number;
    sig: number;
    net: string;
    code: string;
    ids: string;
    sources: string;
    types: string;
    nst: number | null;
    dmin: number | null;
    rms: number;
    gap: number | null;
    magType: string;
    type: string;
    title: string;
  };
}

export interface FloodData {
  id: string;
  location: string;
  severity: "low" | "moderate" | "high" | "extreme";
  status: "normal" | "watch" | "advisory" | "warning";
  description: string;
  timestamp: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  affectedAreas: string[];
  waterLevel: number;
  unit: string;
  forecast: {
    next24h: number;
    trend: "rising" | "falling" | "stable";
  };
  dataSource: "real" | "mock";
}

export interface FloodAlert {
  id: string;
  location: string;
  severity: "low" | "moderate" | "high" | "extreme";
  status: "active" | "warning" | "watch" | "advisory";
  description: string;
  timestamp: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  affectedAreas: string[];
  waterLevel: number;
  unit: string;
}

export interface TsunamiAlert {
  id: string;
  location: string;
  severity: "low" | "moderate" | "high" | "extreme";
  status: "active" | "warning" | "watch" | "advisory";
  description: string;
  timestamp: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  waveHeight: number;
  unit: string;
  arrivalTime: string;
}

export interface VolcanicEruption {
  id: string;
  volcanoName: string;
  location: string;
  status: "normal" | "advisory" | "watch" | "warning";
  alertLevel: number;
  description: string;
  timestamp: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  lastEruption: string;
  elevation: number;
  type: string;
}

export interface DamStatus {
  id: string;
  damName: string;
  location: string;
  status: "normal" | "caution" | "warning" | "critical";
  waterLevel: number;
  capacity: number;
  percentage: number;
  description: string;
  timestamp: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  lastUpdate: string;
}

export type DisasterType =
  | "earthquake"
  | "flood"
  | "tsunami"
  | "volcanic"
  | "dam"
  | "weather";

export interface DisasterFilter {
  type: DisasterType | "all";
  severity: string;
  timeRange: string;
  location: string;
}

export interface DisasterSummary {
  total: number;
  byType: Record<DisasterType, number>;
  bySeverity: Record<string, number>;
  lastUpdated: string;
}
