import {
  Badge,
  Card,
  Grid,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconAlertTriangle,
  IconClock,
  IconDroplet,
  IconMountain,
  IconWashTumbleDry,
  IconWaterpolo,
} from "@tabler/icons-react";
import { DisasterSummary as DisasterSummaryType } from "../types";

interface DisasterSummaryProps {
  summary: DisasterSummaryType;
}

export function DisasterSummary({ summary }: DisasterSummaryProps) {
  const stats = [
    {
      title: "Earthquakes",
      value: summary.byType.earthquake,
      icon: IconAlertTriangle,
      color: "red",
    },
    {
      title: "Flood Alerts",
      value: summary.byType.flood,
      icon: IconDroplet,
      color: "blue",
    },
    {
      title: "Tsunami Alerts",
      value: summary.byType.tsunami,
      icon: IconWaterpolo,
      color: "cyan",
    },
    {
      title: "Volcanic Activity",
      value: summary.byType.volcanic,
      icon: IconMountain,
      color: "orange",
    },
    {
      title: "Dam Status",
      value: summary.byType.dam,
      icon: IconWashTumbleDry,
      color: "green",
    },
  ];

  const severityStats = [
    { label: "Low", value: summary.bySeverity.low, color: "blue" },
    { label: "Moderate", value: summary.bySeverity.moderate, color: "yellow" },
    { label: "High", value: summary.bySeverity.high, color: "orange" },
    { label: "Extreme", value: summary.bySeverity.extreme, color: "red" },
  ];

  return (
    <Stack gap="lg">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={3}>Disaster Overview</Title>
          <Group gap={0}>
            <ThemeIcon color="gray" variant="transparent">
              <IconClock size={16} />
            </ThemeIcon>
            <Text size="sm" c="dimmed">
              Last updated:{" "}
              {new Date(summary.lastUpdated).toLocaleString("en-PH")}
            </Text>
          </Group>
        </Group>

        <Grid>
          {stats.map((stat) => (
            <Grid.Col
              key={stat.title}
              span={{ base: 12, sm: 6, md: 4, lg: 2.4 }}
            >
              <Card shadow="sm" padding="md" radius="md" withBorder>
                <Group>
                  <ThemeIcon color={stat.color} size="lg">
                    <stat.icon size={20} />
                  </ThemeIcon>
                  <div>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                      {stat.title}
                    </Text>
                    <Text fw={700} size="xl">
                      {stat.value}
                    </Text>
                  </div>
                </Group>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={4} mb="md">
          Severity Breakdown
        </Title>
        <Group gap="md">
          {severityStats.map((stat) => (
            <Badge
              key={stat.label}
              color={stat.color}
              size="lg"
              variant="light"
              leftSection={
                <Text size="sm" fw={700}>
                  {stat.value}
                </Text>
              }
            >
              {stat.label}
            </Badge>
          ))}
        </Group>
      </Card>
    </Stack>
  );
}
