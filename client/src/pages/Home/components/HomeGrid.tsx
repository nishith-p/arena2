import { Key } from "react";
import { useQuery } from "@tanstack/react-query";
import { Center, Loader, SimpleGrid, Text } from "@mantine/core";

import { CardItem } from "./CardItem";

export const HomeGrid = () => {
  const { data, isLoading, isError } = useQuery(["todos"], async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/scrap/`);
    const data = await response.json();
    return data;
  });

  if (isLoading) {
    return (
      <Center maw={400} h={100} mx="auto">
        <Loader color="violet" size="xl" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center maw={400} h={100} mx="auto">
        <Text c="dimmed" size="xl">
          Something went wrong.
        </Text>
      </Center>
    );
  }

  return (
    <SimpleGrid
      mb={28}
      px={20}
      cols={3}
      spacing="lg"
      breakpoints={[
        { maxWidth: "62rem", cols: 3, spacing: "md" },
        { maxWidth: "48rem", cols: 2, spacing: "sm" },
        { maxWidth: "36rem", cols: 1, spacing: "sm" },
      ]}
    >
      {data?.data.map(
        (queueName: { host: string; name: string }, index: Key) => {
          const { host, name: qName } = queueName;
          return (
            <div key={index}>
              <CardItem host={host} qName={qName} />
            </div>
          );
        }
      )}
    </SimpleGrid>
  );
};
