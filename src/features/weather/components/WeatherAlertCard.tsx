import {
  Alert,
  Badge,
  Card,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconAlertTriangle,
  IconCloudStorm,
  IconDroplet,
  IconFlame,
  IconWind,
} from "@tabler/icons-react";
import { WeatherAlert } from "../types";

interface WeatherAlertCardProps {
  alert: WeatherAlert;
}

const getAlertIcon = (type: string) => {
  switch (type) {
    case "typhoon":
      return <IconWind size={20} />;
    case "flood":
      return <IconDroplet size={20} />;
    case "thunderstorm":
      return <IconCloudStorm size={20} />;
    case "heat":
      return <IconFlame size={20} />;
    default:
      return <IconAlertTriangle size={20} />;
  }
};

const getSeverityColor = (severity: string) => {
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

const formatDate = (timestamp: string) => {
  return new Date(timestamp).toLocaleString("en-PH", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function WeatherAlertCard({ alert }: WeatherAlertCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Group>
          <ThemeIcon color={getSeverityColor(alert.severity)} size="lg">
            {getAlertIcon(alert.type)}
          </ThemeIcon>
          <div>
            <Title order={4}>{alert.title}</Title>
            <Text size="sm" c="dimmed" tt="capitalize">
              {alert.type} Alert
            </Text>
          </div>
        </Group>
        <Badge color={getSeverityColor(alert.severity)} size="sm">
          {alert.severity.toUpperCase()}
        </Badge>
      </Group>

      <Stack gap="xs">
        <Text size="sm">{alert.description}</Text>

        <div>
          <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb="xs">
            Affected Areas
          </Text>
          <Text size="sm">{alert.affectedAreas.join(", ")}</Text>
        </div>

        <Group grow>
          <div>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Start Time
            </Text>
            <Text size="sm">{formatDate(alert.startTime)}</Text>
          </div>
          <div>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              End Time
            </Text>
            <Text size="sm">{formatDate(alert.endTime)}</Text>
          </div>
        </Group>

        {alert.dataSource === "mock" && (
          <Alert color="orange" title="Demo Data">
            This is sample weather alert data for demonstration purposes.
          </Alert>
        )}
      </Stack>
    </Card>
  );
}
