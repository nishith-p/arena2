import { Header, Group, Box } from "@mantine/core";
import { IconActivity } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export function HeaderMenu() {
  return (
    <Box pb={30}>
      <Header height={60} px="md">
        <Group mt="xs" position="apart" sx={{ height: "100%" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <IconActivity size={48} strokeWidth={2} color={"#4540bf"} />
          </Link>
        </Group>
      </Header>
    </Box>
  );
}
