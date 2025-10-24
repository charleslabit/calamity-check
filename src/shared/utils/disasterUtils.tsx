import {
  IconAlertTriangle,
  IconDroplet,
  IconMountain,
  IconWashTumbleDry,
  IconWaterpolo,
} from "@tabler/icons-react";

export const getDisasterIcon = (type: string) => {
  switch (type) {
    case "earthquake":
      return <IconAlertTriangle size={20} />;
    case "flood":
      return <IconDroplet size={20} />;
    case "tsunami":
      return <IconWaterpolo size={20} />;
    case "volcanic":
      return <IconMountain size={20} />;
    case "dam":
      return <IconWashTumbleDry size={20} />;
    default:
      return <IconAlertTriangle size={20} />;
  }
};

export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "low":
      return "blue";
    case "moderate":
      return "yellow";
    case "high":
      return "orange";
    case "extreme":
      return "red";
    default:
      return "gray";
  }
};

export const formatDate = (timestamp: string | number) => {
  const date =
    typeof timestamp === "string" ? new Date(timestamp) : new Date(timestamp);
  return date.toLocaleString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
