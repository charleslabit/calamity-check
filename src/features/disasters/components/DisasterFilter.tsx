import {
  Button,
  Card,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconFilter, IconRefresh, IconSearch } from "@tabler/icons-react";
import { DisasterFilter as DisasterFilterType } from "../types";

interface DisasterFilterProps {
  filter: DisasterFilterType;
  onFilterChange: (filter: DisasterFilterType) => void;
  onRefresh: () => void;
  isLoading?: boolean;
}

export function DisasterFilter({
  filter,
  onFilterChange,
  onRefresh,
  isLoading,
}: DisasterFilterProps) {
  const disasterTypes = [
    { value: "all", label: "All Disasters" },
    { value: "earthquake", label: "Earthquakes" },
    { value: "flood", label: "Flood Alerts" },
    { value: "tsunami", label: "Tsunami Alerts" },
    { value: "volcanic", label: "Volcanic Activity" },
    { value: "dam", label: "Dam Status" },
  ];

  const severityOptions = [
    { value: "all", label: "All Severities" },
    { value: "low", label: "Low" },
    { value: "moderate", label: "Moderate" },
    { value: "high", label: "High" },
    { value: "extreme", label: "Extreme" },
  ];

  const timeRangeOptions = [
    { value: "all", label: "All Time" },
    { value: "1h", label: "Last Hour" },
    { value: "24h", label: "Last 24 Hours" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
  ];

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Group>
            <IconFilter size={20} />
            <Text fw={600}>Filter Disasters</Text>
          </Group>
          <Button
            leftSection={<IconRefresh size={16} />}
            onClick={onRefresh}
            loading={isLoading}
            variant="light"
          >
            Refresh
          </Button>
        </Group>

        <Group grow>
          <Select
            label="Disaster Type"
            placeholder="Select type"
            data={disasterTypes}
            value={filter.type}
            onChange={(value) =>
              onFilterChange({ ...filter, type: value as any })
            }
          />
          <Select
            label="Severity"
            placeholder="Select severity"
            data={severityOptions}
            value={filter.severity}
            onChange={(value) =>
              onFilterChange({ ...filter, severity: value || "all" })
            }
          />
          <Select
            label="Time Range"
            placeholder="Select time range"
            data={timeRangeOptions}
            value={filter.timeRange}
            onChange={(value) =>
              onFilterChange({ ...filter, timeRange: value || "all" })
            }
          />
        </Group>

        <Group grow>
          <TextInput
            label="Location"
            placeholder="Search by location..."
            leftSection={<IconSearch size={16} />}
            value={filter.location}
            onChange={(event) =>
              onFilterChange({ ...filter, location: event.currentTarget.value })
            }
          />
        </Group>
      </Stack>
    </Card>
  );
}
