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
  formatDate,
  getDisasterIcon,
  getSeverityColor,
} from "../../../shared/utils/disasterUtils";
import {
  DamStatus,
  Earthquake,
  FloodAlert,
  TsunamiAlert,
  VolcanicEruption,
} from "../types";

interface DisasterCardProps {
  disaster:
    | Earthquake
    | FloodAlert
    | TsunamiAlert
    | VolcanicEruption
    | DamStatus;
  type: "earthquake" | "flood" | "tsunami" | "volcanic" | "dam";
}

export function DisasterCard({ disaster, type }: DisasterCardProps) {
  const renderEarthquake = (earthquake: Earthquake) => (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Group>
          <ThemeIcon
            color={getSeverityColor(
              earthquake.properties.mag >= 7
                ? "extreme"
                : earthquake.properties.mag >= 5
                ? "high"
                : "moderate"
            )}
          >
            {getDisasterIcon(type)}
          </ThemeIcon>
          <Title order={4}>Earthquake</Title>
        </Group>
        <Badge
          color={getSeverityColor(
            earthquake.properties.mag >= 7
              ? "extreme"
              : earthquake.properties.mag >= 5
              ? "high"
              : "moderate"
          )}
        >
          Magnitude {earthquake.properties.mag}
        </Badge>
      </Group>

      <Stack gap="xs">
        <Text size="sm" c="dimmed">
          {earthquake.properties.place}
        </Text>
        <Text size="sm">
          <strong>Time:</strong> {formatDate(earthquake.properties.time)}
        </Text>
        <Text size="sm">
          <strong>Depth:</strong> {earthquake.geometry.coordinates[2]} km
        </Text>
        {earthquake.properties.tsunami === 1 && (
          <Alert color="red" title="Tsunami Alert">
            Tsunami warning issued
          </Alert>
        )}
      </Stack>
    </Card>
  );

  const renderFlood = (flood: FloodAlert) => (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Group>
          <ThemeIcon color={getSeverityColor(flood.severity)}>
            {getDisasterIcon(type)}
          </ThemeIcon>
          <Title order={4}>Flood Alert</Title>
        </Group>
        <Badge color={getSeverityColor(flood.severity)}>
          {flood.severity.toUpperCase()}
        </Badge>
      </Group>

      <Stack gap="xs">
        <Text size="sm" c="dimmed">
          {flood.location}
        </Text>
        <Text size="sm">{flood.description}</Text>
        <Text size="sm">
          <strong>Water Level:</strong> {flood.waterLevel} {flood.unit}
        </Text>
        <Text size="sm">
          <strong>Affected Areas:</strong> {flood.affectedAreas.join(", ")}
        </Text>
        <Text size="sm" c="dimmed">
          {formatDate(flood.timestamp)}
        </Text>
      </Stack>
    </Card>
  );

  const renderTsunami = (tsunami: TsunamiAlert) => (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Group>
          <ThemeIcon color={getSeverityColor(tsunami.severity)}>
            {getDisasterIcon(type)}
          </ThemeIcon>
          <Title order={4}>Tsunami Alert</Title>
        </Group>
        <Badge color={getSeverityColor(tsunami.severity)}>
          {tsunami.severity.toUpperCase()}
        </Badge>
      </Group>

      <Stack gap="xs">
        <Text size="sm" c="dimmed">
          {tsunami.location}
        </Text>
        <Text size="sm">{tsunami.description}</Text>
        <Text size="sm">
          <strong>Wave Height:</strong> {tsunami.waveHeight} {tsunami.unit}
        </Text>
        <Text size="sm">
          <strong>Arrival Time:</strong> {formatDate(tsunami.arrivalTime)}
        </Text>
        <Text size="sm" c="dimmed">
          {formatDate(tsunami.timestamp)}
        </Text>
      </Stack>
    </Card>
  );

  const renderVolcanic = (volcanic: VolcanicEruption) => (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Group>
          <ThemeIcon
            color={getSeverityColor(
              volcanic.status === "warning"
                ? "high"
                : volcanic.status === "advisory"
                ? "moderate"
                : "low"
            )}
          >
            {getDisasterIcon(type)}
          </ThemeIcon>
          <Title order={4}>Volcanic Activity</Title>
        </Group>
        <Badge
          color={getSeverityColor(
            volcanic.status === "warning"
              ? "high"
              : volcanic.status === "advisory"
              ? "moderate"
              : "low"
          )}
        >
          Alert Level {volcanic.alertLevel}
        </Badge>
      </Group>

      <Stack gap="xs">
        <Text size="sm" c="dimmed">
          {volcanic.volcanoName} - {volcanic.location}
        </Text>
        <Text size="sm">{volcanic.description}</Text>
        <Text size="sm">
          <strong>Type:</strong> {volcanic.type}
        </Text>
        <Text size="sm">
          <strong>Elevation:</strong> {volcanic.elevation} m
        </Text>
        <Text size="sm">
          <strong>Last Eruption:</strong> {volcanic.lastEruption}
        </Text>
        <Text size="sm" c="dimmed">
          {formatDate(volcanic.timestamp)}
        </Text>
      </Stack>
    </Card>
  );

  const renderDam = (dam: DamStatus) => (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Group>
          <ThemeIcon
            color={getSeverityColor(
              dam.status === "critical"
                ? "extreme"
                : dam.status === "warning"
                ? "high"
                : dam.status === "caution"
                ? "moderate"
                : "low"
            )}
          >
            {getDisasterIcon(type)}
          </ThemeIcon>
          <Title order={4}>Dam Status</Title>
        </Group>
        <Badge
          color={getSeverityColor(
            dam.status === "critical"
              ? "extreme"
              : dam.status === "warning"
              ? "high"
              : dam.status === "caution"
              ? "moderate"
              : "low"
          )}
        >
          {dam.status.toUpperCase()}
        </Badge>
      </Group>

      <Stack gap="xs">
        <Text size="sm" c="dimmed">
          {dam.damName} - {dam.location}
        </Text>
        <Text size="sm">{dam.description}</Text>
        <Text size="sm">
          <strong>Water Level:</strong> {dam.waterLevel} / {dam.capacity} m (
          {dam.percentage.toFixed(1)}%)
        </Text>
        <Text size="sm">
          <strong>Last Update:</strong> {formatDate(dam.lastUpdate)}
        </Text>
      </Stack>
    </Card>
  );

  switch (type) {
    case "earthquake":
      return renderEarthquake(disaster as Earthquake);
    case "flood":
      return renderFlood(disaster as FloodAlert);
    case "tsunami":
      return renderTsunami(disaster as TsunamiAlert);
    case "volcanic":
      return renderVolcanic(disaster as VolcanicEruption);
    case "dam":
      return renderDam(disaster as DamStatus);
    default:
      return null;
  }
}
