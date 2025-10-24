import { usePagination } from "@/shared/hooks/usePagination";
import {
  Alert,
  Grid,
  Group,
  Pagination,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { DisasterFilter as DisasterFilterType } from "../types";
import { DisasterCard } from "./DisasterCard";

interface DisasterGridProps {
  filteredDisasters: any[];
  filter: DisasterFilterType;
}

export function DisasterGrid({ filteredDisasters, filter }: DisasterGridProps) {
  const {
    totalPages,
    startIndex,
    endIndex,
    paginatedItems: paginatedDisasters,
    currentPage,
    setCurrentPage,
  } = usePagination({
    items: filteredDisasters,
    dependencies: [filter], // Reset pagination when filter changes
  });

  return (
    <div>
      <Group justify="space-between" mb="md">
        <Title order={3}>
          {filter.type === "all"
            ? "All Disasters"
            : `${
                filter?.type?.charAt(0).toUpperCase() + filter?.type?.slice(1)
              } Disasters`}
        </Title>
        <Text c="dimmed">
          {filteredDisasters.length}{" "}
          {filteredDisasters.length === 1 ? "disaster" : "disasters"} found
        </Text>
      </Group>

      {filteredDisasters.length === 0 ? (
        <Alert color="blue" title="No disasters found">
          No disasters match your current filter criteria. Try adjusting your
          filters or refresh the data.
        </Alert>
      ) : (
        <Stack gap="md">
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Group justify="end" mb="md">
              <Pagination
                total={totalPages}
                value={currentPage}
                onChange={setCurrentPage}
                size="sm"
                withEdges
                siblings={1}
              />
            </Group>
          )}

          {/* Disaster Grid */}
          <Grid>
            {paginatedDisasters.map((disaster: any, index: number) => (
              <Grid.Col
                key={`${disaster.type}-${startIndex + index}`}
                span={{ base: 12, sm: 6, lg: 4 }}
              >
                <DisasterCard disaster={disaster} type={disaster.type} />
              </Grid.Col>
            ))}
          </Grid>

          {/* Bottom Pagination Info */}
          {totalPages > 1 && (
            <Group justify="center" mt="md">
              <Text size="sm" c="dimmed">
                Showing {startIndex + 1}-
                {Math.min(endIndex, filteredDisasters.length)} of{" "}
                {filteredDisasters.length} disasters
              </Text>
            </Group>
          )}
        </Stack>
      )}
    </div>
  );
}
