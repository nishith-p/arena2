import { useParams } from "react-router-dom";
import { Badge, Container, Group, Tabs, Title } from "@mantine/core";
import {
  IconCircleCheck,
  IconClockHour4,
  IconBolt,
  IconExclamationCircle,
  IconHandStop,
  IconPlayerPause,
} from "@tabler/icons-react";
import { QueueDataGrid } from "./QueueDataGrid";

type QueueParams = {
  host: string;
  name: string;
};

export interface QueueDataType {
  label: string;
  state: string;
  timestamp: string;
  progress: string;
  reqPayload: any;
  processed: string;
  finished: string;
  reasonForFailure: string;
}

export const QueueLayout = () => {
  const { host = "defaultHost", name: qName = "defaultName" } =
    useParams<QueueParams>();

  return (
    <Container mx="md" mb={36} fluid>
      <Group mb="xs">
        <Title
          order={3}
          sx={{ textOverflow: "ellipsis", overflowWrap: "break-word" }}
          fz={48}
          tt="uppercase"
        >
          {qName}
        </Title>
        <Badge size="lg" color="violet" variant="outline">
          {host}
        </Badge>
      </Group>
      <Tabs mt="lg" color="dark" variant="pills" defaultValue="waiting">
        <Tabs.List>
          <Tabs.Tab value="waiting" icon={<IconClockHour4 color={"#FFA41B"} />}>
            Waiting
          </Tabs.Tab>
          <Tabs.Tab value="active" icon={<IconBolt color={"#037ef3"} />}>
            Active
          </Tabs.Tab>
          <Tabs.Tab
            value="completed"
            icon={<IconCircleCheck color={"#00C16E"} />}
          >
            Completed
          </Tabs.Tab>
          <Tabs.Tab
            value="failed"
            icon={<IconExclamationCircle color={"#F85A40"} />}
          >
            Failed
          </Tabs.Tab>
          <Tabs.Tab value="delayed" icon={<IconHandStop color={"#F48924"} />}>
            Delayed
          </Tabs.Tab>
          <Tabs.Tab value="paused" icon={<IconPlayerPause color={"#52565E"} />}>
            Paused
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="waiting" pt="xs">
          <QueueDataGrid host={host} qName={qName} statusType="waiting" />
        </Tabs.Panel>
        <Tabs.Panel value="active" pt="xs">
          <QueueDataGrid host={host} qName={qName} statusType="active" />
        </Tabs.Panel>
        <Tabs.Panel value="completed" pt="xs">
          <QueueDataGrid host={host} qName={qName} statusType="completed" />
        </Tabs.Panel>
        <Tabs.Panel value="failed" pt="xs">
          <QueueDataGrid host={host} qName={qName} statusType="failed" />
        </Tabs.Panel>
        <Tabs.Panel value="delayed" pt="xs">
          <QueueDataGrid host={host} qName={qName} statusType="delayed" />
        </Tabs.Panel>
        <Tabs.Panel value="paused" pt="xs">
          <QueueDataGrid host={host} qName={qName} statusType="paused" />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};
