import {
  Alert,
  Grid,
  Group,
  Loader,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { IconCloud, IconDroplet, IconWash } from "@tabler/icons-react";
import { useWeather } from "../hooks/useWeather";
import { FloodCard } from "./FloodCard";
import { WeatherAlertCard } from "./WeatherAlertCard";
import { WeatherCard } from "./WeatherCard";

export function WeatherSection() {
  const {
    weatherData,
    weatherLoading,
    weatherAlerts,
    weatherAlertsLoading,
    floodData,
    floodLoading,
  } = useWeather();

  return (
    <Tabs defaultValue="current" variant="outline">
      <Tabs.List>
        <Tabs.Tab value="current" leftSection={<IconCloud size={16} />}>
          Current Weather
        </Tabs.Tab>
        <Tabs.Tab value="flood" leftSection={<IconWash size={16} />}>
          Flood Monitor
        </Tabs.Tab>
        <Tabs.Tab value="alerts" leftSection={<IconDroplet size={16} />}>
          Weather Alerts
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="current" pt="md">
        <Stack gap="md">
          <Group justify="space-between">
            <Title order={3}>Current Weather</Title>
            <Text size="sm" c="dimmed">
              Major Philippine Cities
            </Text>
          </Group>

          {weatherLoading ? (
            <Group justify="center" py="xl">
              <Loader size="md" />
              <Text>Loading weather data...</Text>
            </Group>
          ) : (
            <Grid>
              {weatherData?.slice(0, 4).map((weather) => (
                <Grid.Col key={weather.id} span={{ base: 12, sm: 6, lg: 3 }}>
                  <WeatherCard weather={weather} />
                </Grid.Col>
              ))}
            </Grid>
          )}
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="flood" pt="md">
        <Stack gap="md">
          <Group justify="space-between">
            <Title order={3}>Flood Monitoring</Title>
            <Text size="sm" c="dimmed">
              River discharge data
            </Text>
          </Group>

          {floodLoading ? (
            <Group justify="center" py="xl">
              <Loader size="md" />
              <Text>Loading flood data...</Text>
            </Group>
          ) : (
            <Grid>
              {floodData?.map((flood) => (
                <Grid.Col key={flood.id} span={{ base: 12, md: 6, lg: 4 }}>
                  <FloodCard flood={flood} />
                </Grid.Col>
              ))}
            </Grid>
          )}
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="alerts" pt="md">
        <Stack gap="md">
          <Group justify="space-between">
            <Title order={3}>Weather Alerts</Title>
            <Text size="sm" c="dimmed">
              Active weather warnings
            </Text>
          </Group>

          {weatherAlertsLoading ? (
            <Group justify="center" py="xl">
              <Loader size="md" />
              <Text>Loading weather alerts...</Text>
            </Group>
          ) : weatherAlerts && weatherAlerts.length > 0 ? (
            <Grid>
              {weatherAlerts.map((alert: any) => (
                <Grid.Col key={alert.id} span={{ base: 12, md: 6 }}>
                  <WeatherAlertCard alert={alert} />
                </Grid.Col>
              ))}
            </Grid>
          ) : (
            <Alert color="blue" title="No Active Weather Alerts">
              No weather alerts are currently active in the Philippines.
            </Alert>
          )}
        </Stack>
      </Tabs.Panel>
    </Tabs>
  );
}
