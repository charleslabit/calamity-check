import {
  Badge,
  Card,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconCloud, IconDroplet, IconTemperature } from "@tabler/icons-react";
import { WeatherData } from "../types";

interface WeatherCardProps {
  weather: WeatherData;
}

const getWeatherIcon = (icon: string) => {
  // Map OpenWeatherMap icons to Tabler icons
  if (icon.includes("01")) return <IconTemperature size={20} />; // Clear sky
  if (icon.includes("02") || icon.includes("03") || icon.includes("04"))
    return <IconCloud size={20} />; // Clouds
  if (icon.includes("09") || icon.includes("10") || icon.includes("11"))
    return <IconDroplet size={20} />; // Rain
  return <IconCloud size={20} />;
};

const getSeverityColor = (dataSource: string) => {
  return dataSource === "real" ? "green" : "orange";
};

const formatDate = (timestamp: string) => {
  return new Date(timestamp).toLocaleString("en-PH", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Group>
          <ThemeIcon color="blue" size="lg">
            {getWeatherIcon(weather.icon)}
          </ThemeIcon>
          <div>
            <Title order={4}>{weather.city}</Title>
            <Text size="sm" c="dimmed">
              {formatDate(weather.timestamp)}
            </Text>
          </div>
        </Group>
        <Badge color={getSeverityColor(weather.dataSource)} size="sm">
          {weather.dataSource === "real" ? "Live" : "Demo"}
        </Badge>
      </Group>

      <Stack gap="xs">
        <Group justify="space-between">
          <Text size="xl" fw={700}>
            {Math.round(weather.temperature)}°C
          </Text>
          <Text size="sm" c="dimmed">
            Feels like {Math.round(weather.feelsLike)}°C
          </Text>
        </Group>

        <Text size="sm" c="dimmed" tt="capitalize">
          {weather.description}
        </Text>

        <Group grow>
          <div>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Humidity
            </Text>
            <Text size="sm" fw={600}>
              {Math.round(weather.humidity)}%
            </Text>
          </div>
          <div>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Wind
            </Text>
            <Text size="sm" fw={600}>
              {weather.windSpeed.toFixed(1)} m/s
            </Text>
          </div>
          <div>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Pressure
            </Text>
            <Text size="sm" fw={600}>
              {Math.round(weather.pressure)} hPa
            </Text>
          </div>
        </Group>

        <Group grow>
          <div>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Visibility
            </Text>
            <Text size="sm" fw={600}>
              {weather.visibility.toFixed(1)} km
            </Text>
          </div>
          <div>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              UV Index
            </Text>
            <Text size="sm" fw={600}>
              {weather.uvIndex}
            </Text>
          </div>
        </Group>
      </Stack>
    </Card>
  );
}
