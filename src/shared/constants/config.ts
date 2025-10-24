// Philippines coordinates: 4.5°N to 21°N, 116°E to 127°E
export const PHILIPPINES_BOUNDS = {
  minLat: 4.5,
  maxLat: 21,
  minLng: 116,
  maxLng: 127,
};

export const REFETCH_INTERVALS = {
  DISASTERS: 5 * 60 * 1000, // 5 minutes
  WEATHER: 10 * 60 * 1000, // 10 minutes
  WEATHER_ALERTS: 30 * 60 * 1000, // 30 minutes
  FLOOD: 15 * 60 * 1000, // 15 minutes
} as const;

export const PAGINATION = {
  ITEMS_PER_PAGE: 12,
} as const;

export const SEVERITY_LEVELS = {
  LOW: "low",
  MODERATE: "moderate",
  HIGH: "high",
  EXTREME: "extreme",
} as const;

export const DISASTER_TYPES = {
  EARTHQUAKE: "earthquake",
  FLOOD: "flood",
  TSUNAMI: "tsunami",
  VOLCANIC: "volcanic",
  DAM: "dam",
  WEATHER: "weather",
} as const;
