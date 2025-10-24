"use client";

import {
  DisasterFilter,
  DisasterGrid,
  DisasterSummary,
  useDisasterPage,
} from "@/features/disasters";
import { WeatherSection } from "@/features/weather";
import { AppHeader } from "@/shared/components/AppHeader";
import { LoadingState } from "@/shared/components/LoadingState";
import { Container, Stack } from "@mantine/core";

export default function Home() {
  const {
    filter,
    setFilter,
    summary,
    filteredDisasters,
    isLoading,
    handleRefresh,
  } = useDisasterPage();

  if (isLoading && !summary) {
    return <LoadingState message="Loading disaster data..." />;
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <AppHeader />

        <WeatherSection />

        {summary && <DisasterSummary summary={summary} />}

        <DisasterFilter
          filter={filter}
          onFilterChange={setFilter}
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />

        <DisasterGrid filteredDisasters={filteredDisasters} filter={filter} />
      </Stack>
    </Container>
  );
}
