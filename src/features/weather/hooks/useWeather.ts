import { useQuery } from "@tanstack/react-query";
import { REFETCH_INTERVALS } from "../../../shared/constants/config";
import { fetchFloodData } from "../services/floodApi";
import {
  fetchCurrentWeather,
  fetchWeatherAlerts,
} from "../services/weatherApi";

export function useWeather() {
  const { data: weatherData, isLoading: weatherLoading } = useQuery({
    queryKey: ["weather"],
    queryFn: () => fetchCurrentWeather(),
    refetchInterval: REFETCH_INTERVALS.WEATHER,
  });

  const { data: weatherAlerts, isLoading: weatherAlertsLoading } = useQuery({
    queryKey: ["weather-alerts"],
    queryFn: fetchWeatherAlerts,
    refetchInterval: REFETCH_INTERVALS.WEATHER_ALERTS,
  });

  const { data: floodData, isLoading: floodLoading } = useQuery({
    queryKey: ["flood-data"],
    queryFn: fetchFloodData,
    refetchInterval: REFETCH_INTERVALS.FLOOD,
  });

  return {
    weatherData,
    weatherLoading,
    weatherAlerts,
    weatherAlertsLoading,
    floodData,
    floodLoading,
  };
}
