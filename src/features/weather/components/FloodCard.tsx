import {
  Badge,
  Card,
  Group,
  Progress,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconDroplet,
  IconMinus,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";
import { FloodData } from "../../disasters/types";

interface FloodCardProps {
  flood: FloodData;
}

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

const getStatusColor = (status: string) => {
  switch (status) {
    case "normal":
      return "green";
    case "watch":
      return "blue";
    case "advisory":
      return "yellow";
    case "warning":
      return "red";
    default:
      return "gray";
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "rising":
      return <IconTrendingUp size={16} />;
    case "falling":
      return <IconTrendingDown size={16} />;
    case "stable":
      return <IconMinus size={16} />;
    default:
      return <IconMinus size={16} />;
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

export function FloodCard({ flood }: FloodCardProps) {
  const severityColor = getSeverityColor(flood.severity);
  const statusColor = getStatusColor(flood.status);
  const trendIcon = getTrendIcon(flood.forecast.trend);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Group>
          <ThemeIcon color={severityColor} size="lg">
            <IconDroplet size={20} />
          </ThemeIcon>
          <div>
            <Title order={4}>Flood Monitor</Title>
            <Text size="sm" c="dimmed">
              {formatDate(flood.timestamp)}
            </Text>
          </div>
        </Group>
        <Group gap="xs">
          <Badge color={severityColor} size="sm">
            {flood.severity.toUpperCase()}
          </Badge>
          <Badge color={statusColor} size="sm">
            {flood.status.toUpperCase()}
          </Badge>
          {flood.dataSource === "real" ? (
            <Badge color="green" size="sm">
              Live
            </Badge>
          ) : (
            <Badge color="orange" size="sm">
              Demo
            </Badge>
          )}
        </Group>
      </Group>

      <Stack gap="xs">
        <Text size="sm" c="dimmed">
          {flood.location}
        </Text>

        <Text size="sm">{flood.description}</Text>

        <Group grow>
          <div>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Current Level
            </Text>
            <Text size="lg" fw={700} c={severityColor}>
              {flood.waterLevel.toFixed(1)} {flood.unit}
            </Text>
          </div>
          <div>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              24h Forecast
            </Text>
            <Text size="sm" fw={600}>
              {flood.forecast.next24h.toFixed(1)} {flood.unit}
            </Text>
          </div>
        </Group>

        <div>
          <Group justify="space-between" mb="xs">
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Water Level Trend
            </Text>
            <Group gap="xs">
              {trendIcon}
              <Text size="xs" c="dimmed" tt="capitalize">
                {flood.forecast.trend}
              </Text>
            </Group>
          </Group>
          <Progress
            value={(flood.waterLevel / 200) * 100} // Assuming 200 m³/s as max for visualization
            color={severityColor}
            size="sm"
            radius="md"
          />
        </div>

        <div>
          <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb="xs">
            Affected Areas
          </Text>
          <Text size="sm">{flood.affectedAreas.join(", ")}</Text>
        </div>
      </Stack>
    </Card>
  );
}
