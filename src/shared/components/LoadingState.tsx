import { Container, Group, Loader, Text } from "@mantine/core";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <Container size="xl" py="xl">
      <Group justify="center" py="xl">
        <Loader size="lg" />
        <Text>{message}</Text>
      </Group>
    </Container>
  );
}
