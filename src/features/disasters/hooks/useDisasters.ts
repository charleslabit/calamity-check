import { useQuery } from "@tanstack/react-query";
import { REFETCH_INTERVALS } from "../../../shared/constants/config";
import {
  fetchDamStatus,
  fetchDisasterSummary,
  fetchEarthquakes,
  fetchFloodAlerts,
  fetchTsunamiAlerts,
  fetchVolcanicEruptions,
} from "../services/disasterApi";

export function useDisasters() {
  const { data: earthquakes, isLoading: earthquakesLoading } = useQuery({
    queryKey: ["earthquakes"],
    queryFn: fetchEarthquakes,
    refetchInterval: REFETCH_INTERVALS.DISASTERS,
  });

  const { data: floods, isLoading: floodsLoading } = useQuery({
    queryKey: ["floods"],
    queryFn: fetchFloodAlerts,
    refetchInterval: REFETCH_INTERVALS.DISASTERS,
  });

  const { data: tsunamis, isLoading: tsunamisLoading } = useQuery({
    queryKey: ["tsunamis"],
    queryFn: fetchTsunamiAlerts,
    refetchInterval: REFETCH_INTERVALS.DISASTERS,
  });

  const { data: volcanic, isLoading: volcanicLoading } = useQuery({
    queryKey: ["volcanic"],
    queryFn: fetchVolcanicEruptions,
    refetchInterval: REFETCH_INTERVALS.DISASTERS,
  });

  const { data: dams, isLoading: damsLoading } = useQuery({
    queryKey: ["dams"],
    queryFn: fetchDamStatus,
    refetchInterval: REFETCH_INTERVALS.DISASTERS,
  });

  const isLoading =
    earthquakesLoading ||
    floodsLoading ||
    tsunamisLoading ||
    volcanicLoading ||
    damsLoading;

  return {
    earthquakes,
    floods,
    tsunamis,
    volcanic,
    dams,
    isLoading,
  };
}

export function useDisasterSummary() {
  return useQuery({
    queryKey: ["disaster-summary"],
    queryFn: fetchDisasterSummary,
    refetchInterval: REFETCH_INTERVALS.DISASTERS,
  });
}
