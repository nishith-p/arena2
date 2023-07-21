import { Code, Text } from "@mantine/core";

interface NoDataMessageProps {
  errorMessage?: string;
}

export const NoDataMessage = ({ errorMessage }: NoDataMessageProps) => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Text c="dimmed">No data available.</Text>
      {errorMessage ? <Code>Error Message: {errorMessage}</Code> : null}
    </div>
  );
};
