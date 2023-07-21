import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Title,
  Text,
  Badge,
  Group,
  Tooltip,
  SimpleGrid,
  Center,
  Loader,
  ActionIcon,
} from "@mantine/core";
import {
  IconBolt,
  IconCircleCheck,
  IconClockHour4,
  IconExclamationCircle,
  IconHandStop,
  IconPlayerPause,
  IconRefresh,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

interface CardItemProps {
  qName: string;
  host: string;
  link?: string;
}

export function CardItem({ qName, host }: CardItemProps) {
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["queueList", qName],
    async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/scrap/stats/${host}/${qName}`
      );
      const data = await response.json();
      return data;
    }
  );

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading || isFetching) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Center maw={400} h={100} mx="auto">
          <Loader color="violet" size="xl" />
        </Center>
      </Card>
    );
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group position="apart">
        <Title
          order={3}
          sx={{ textOverflow: "ellipsis", overflowWrap: "break-word" }}
        >
          <Link
            to={`/${host}/${qName}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {qName}
          </Link>
        </Title>
        <ActionIcon>
          <IconRefresh color="#464851" onClick={handleRefresh}></IconRefresh>
        </ActionIcon>
      </Group>

      <Group position="apart" mt="sm" mb="xs">
        <Badge size="lg" color="violet" variant="outline">
          {host}
        </Badge>
      </Group>

      <Group mt="sm">
        <SimpleGrid cols={1} verticalSpacing={0.5}>
          <Tooltip label="Waiting">
            <Group mt="sm" mb="xs" sx={{ gap: "5px" }}>
              <IconClockHour4 color={"#FFA41B"}></IconClockHour4>
              <Text c="dimmed" ta="center" fw={600}>
                {data?.data[0].badge}
              </Text>
            </Group>
          </Tooltip>

          <Tooltip label="Active">
            <Group mt="sm" mb="xs" sx={{ gap: "5px" }}>
              <IconBolt color={"#037ef3"}></IconBolt>
              <Text c="dimmed" ta="center" fw={600}>
                {data?.data[1].badge}
              </Text>
            </Group>
          </Tooltip>

          <Tooltip label="Completed">
            <Group mt="sm" mb="xs" sx={{ gap: "5px" }}>
              <IconCircleCheck color={"#00C16E"}></IconCircleCheck>
              <Text c="dimmed" ta="center" fw={600}>
                {data?.data[2].badge}
              </Text>
            </Group>
          </Tooltip>

          <Tooltip label="Failed">
            <Group mt="sm" mb="xs" sx={{ gap: "5px" }}>
              <IconExclamationCircle color={"#F85A40"}></IconExclamationCircle>
              <Text c="dimmed" ta="center" fw={600}>
                {data?.data[3].badge}
              </Text>
            </Group>
          </Tooltip>

          <Tooltip label="Delayed">
            <Group mt="sm" mb="xs" sx={{ gap: "5px" }}>
              <IconHandStop color={"#F48924"}></IconHandStop>
              <Text c="dimmed" ta="center" fw={600}>
                {data?.data[4].badge}
              </Text>
            </Group>
          </Tooltip>

          <Tooltip label="Paused">
            <Group mt="sm" mb="xs" sx={{ gap: "5px" }}>
              <IconPlayerPause color={"#52565E"}></IconPlayerPause>
              <Text c="dimmed" ta="center" fw={600}>
                {data?.data[5].badge}
              </Text>
            </Group>
          </Tooltip>
        </SimpleGrid>
      </Group>
    </Card>
  );
}
