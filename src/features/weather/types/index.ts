export interface WeatherData {
  id: string;
  city: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  description: string;
  icon: string;
  visibility: number;
  uvIndex: number;
  timestamp: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  dataSource: "real" | "mock";
}

export interface WeatherForecast {
  id: string;
  city: string;
  date: string;
  temperature: number;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  description: string;
  icon: string;
  windSpeed: number;
  precipitation: number;
  dataSource: "real" | "mock";
}

export interface WeatherAlert {
  id: string;
  type: "typhoon" | "flood" | "thunderstorm" | "heat" | "wind";
  severity: "low" | "moderate" | "high" | "extreme";
  title: string;
  description: string;
  affectedAreas: string[];
  startTime: string;
  endTime: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  dataSource: "real" | "mock";
}
