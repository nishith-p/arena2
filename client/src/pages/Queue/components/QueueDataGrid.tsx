import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LinearProgress, ThemeProvider, createTheme } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import {
  ActionIcon,
  Button,
  Center,
  Chip,
  Group,
  Loader,
  TextInput,
} from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";

import type {} from "@mui/x-data-grid/themeAugmentation";

import { NoDataMessage } from "../../../components/NoDataMessage";
import {
  CompletedGridColumn,
  FailedGridColumn,
  ActiveGridColumn,
  WaitingGridColumn,
} from "../constants/Headers";

const MuiTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface CompletedTableProps {
  qName: string;
  host: string;
  statusType: string;
}

export const QueueDataGrid = ({
  qName,
  host,
  statusType,
}: CompletedTableProps) => {
  const [pageSize, setPageSize] = useState<number>(20);
  const [fetchSize, setFetchSize] = useState<number>(pageSize);
  const [removeDup, setRemoveDup] = useState("");
  const [checked, setChecked] = useState(false);
  const [gridColumns, setGridColumns] =
    useState<GridColDef[]>(WaitingGridColumn);

  useEffect(() => {
    if (statusType === "active" || statusType === "delayed") {
      setGridColumns(ActiveGridColumn);
    } else if (statusType === "completed") {
      setGridColumns(CompletedGridColumn);
    } else if (statusType === "failed") {
      setGridColumns(FailedGridColumn);
    } else {
      setGridColumns(WaitingGridColumn);
    }
  }, [statusType]);

  useEffect(() => {
    if (checked) {
      setRemoveDup("r");
    } else {
      setRemoveDup("");
    }
  }, [checked]);

  const { data, isLoading, isFetching, refetch } = useQuery(
    ["queueList", host + qName + statusType, pageSize, removeDup, statusType],
    async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/scrap/${host}/${qName}/${statusType}/?pageSize=${pageSize}&dup=${removeDup}`
      );
      const data = await response.json();
      return data;
    }
  );

  //Fetch Hanlders
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    setFetchSize(event.target.value);
  };

  const handleSubmit = () => {
    setPageSize(fetchSize);
  };

  const handleRefresh = () => {
    refetch();
  };

  const CustomGridBar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  if (isLoading) {
    return (
      <Center maw={400} h={100} mx="auto">
        <Loader color="violet" size="xl" />
      </Center>
    );
  }

  return (
    <ThemeProvider theme={MuiTheme}>
      <div style={{ width: "100%" }}>
        {data?.data?.length > 0 ? (
          <div>
            <Group mb="xs" position="right">
              <ActionIcon size="md">
                <IconRefresh
                  color="#464851"
                  onClick={handleRefresh}
                ></IconRefresh>
              </ActionIcon>
              {statusType === "failed" ? (
                <Chip
                  checked={checked}
                  radius="sm"
                  onChange={() => setChecked((v) => !v)}
                >
                  Remove Duplicates
                </Chip>
              ) : null}
              <TextInput
                maxLength={10}
                value={fetchSize}
                onChange={handleInputChange}
                size="xs"
                style={{ width: "125px" }}
                rightSection={
                  <Button
                    size="xs"
                    variant="subtle"
                    uppercase
                    color="gray"
                    onClick={handleSubmit}
                  >
                    Fetch
                  </Button>
                }
                rightSectionWidth={64}
              />
            </Group>

            <DataGrid
              slots={{
                loadingOverlay: LinearProgress,
                toolbar: CustomGridBar,
              }}
              loading={isFetching || isLoading}
              rows={data?.data}
              columns={gridColumns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                    page: 0,
                  },
                },
              }}
              pageSizeOptions={[10, 20, 50, 100]}
              disableRowSelectionOnClick
              getRowId={(row) => row?.label}
            />
          </div>
        ) : (
          <NoDataMessage errorMessage={data?.error ? data?.message : ""} />
        )}
      </div>
    </ThemeProvider>
  );
};
