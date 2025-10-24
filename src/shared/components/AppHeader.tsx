import { Badge, Group, Text, Title } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

export function AppHeader() {
  return (
    <Group justify="space-between">
      <div>
        <Title order={1} c="blue">
          Calamity Check
        </Title>
        <Text c="dimmed" size="lg">
          Tracking of natural disasters in the Philippines
        </Text>
      </div>
      <Badge
        size="lg"
        color="red"
        leftSection={<IconAlertTriangle size={16} />}
      >
        Live Data
      </Badge>
    </Group>
  );
}
