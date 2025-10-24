import { useMemo } from "react";
import { DisasterFilter } from "../types";

interface UseFilteredDisastersProps {
  earthquakes: any[];
  floods: any[];
  tsunamis: any[];
  volcanic: any[];
  dams: any[];
  filter: DisasterFilter;
}

export function useFilteredDisasters({
  earthquakes,
  floods,
  tsunamis,
  volcanic,
  dams,
  filter,
}: UseFilteredDisastersProps) {
  const filteredDisasters = useMemo(() => {
    const allDisasters = [
      ...(earthquakes || []).map((d) => ({
        ...d,
        type: "earthquake" as const,
      })),
      ...(floods || []).map((d) => ({ ...d, type: "flood" as const })),
      ...(tsunamis || []).map((d) => ({ ...d, type: "tsunami" as const })),
      ...(volcanic || []).map((d) => ({ ...d, type: "volcanic" as const })),
      ...(dams || []).map((d) => ({ ...d, type: "dam" as const })),
    ];

    return allDisasters.filter((disaster) => {
      // Filter by type
      if (filter.type !== "all" && disaster.type !== filter.type) {
        return false;
      }

      // Filter by location
      if (filter.location) {
        const location =
          disaster.type === "earthquake"
            ? (disaster as any).properties?.place?.toLowerCase() || ""
            : (disaster as any).location?.toLowerCase() || "";

        if (!location.includes(filter.location.toLowerCase())) {
          return false;
        }
      }

      // Filter by severity
      if (filter.severity !== "all") {
        let severity = "low";

        if (disaster.type === "earthquake") {
          const mag = (disaster as any).properties?.mag || 0;
          severity = mag >= 7 ? "extreme" : mag >= 5 ? "high" : "moderate";
        } else {
          severity = (disaster as any).severity || "low";
        }

        if (severity !== filter.severity) {
          return false;
        }
      }

      // Filter by time range
      if (filter.timeRange !== "all") {
        const now = Date.now();
        const disasterTime =
          disaster.type === "earthquake"
            ? (disaster as any).properties?.time || 0
            : new Date((disaster as any).timestamp || 0).getTime();

        const timeDiff = now - disasterTime;
        const timeRanges = {
          "1h": 60 * 60 * 1000,
          "24h": 24 * 60 * 60 * 1000,
          "7d": 7 * 24 * 60 * 60 * 1000,
          "30d": 30 * 24 * 60 * 60 * 1000,
        };

        if (
          timeDiff > timeRanges[filter.timeRange as keyof typeof timeRanges]
        ) {
          return false;
        }
      }

      return true;
    });
  }, [earthquakes, floods, tsunamis, volcanic, dams, filter]);

  return filteredDisasters;
}
