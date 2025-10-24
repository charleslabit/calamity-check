import { useState } from "react";
import { DisasterFilter as DisasterFilterType } from "../types";
import { useDisasters, useDisasterSummary } from "./useDisasters";
import { useFilteredDisasters } from "./useFilteredDisasters";

export function useDisasterPage() {
  const [filter, setFilter] = useState<DisasterFilterType>({
    type: "all",
    severity: "all",
    timeRange: "all",
    location: "",
  });

  // Custom hooks for data fetching
  const { data: summary, refetch: refetchSummary } = useDisasterSummary();
  const { earthquakes, floods, tsunamis, volcanic, dams, isLoading } =
    useDisasters();

  // Custom hook for filtering
  const filteredDisasters = useFilteredDisasters({
    earthquakes: earthquakes || [],
    floods: floods || [],
    tsunamis: tsunamis || [],
    volcanic: volcanic || [],
    dams: dams || [],
    filter,
  });

  const handleRefresh = () => {
    refetchSummary();
  };

  return {
    filter,
    setFilter,
    summary,
    filteredDisasters,
    isLoading,
    handleRefresh,
  };
}
