import { Code } from "@mantine/core";
import { GridColDef } from "@mui/x-data-grid";

export const CompletedGridColumn: GridColDef[] = [
  { field: "label", headerName: "Label", flex: 0.5 },
  {
    field: "timestamp",
    headerName: "Timestamp",
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: "progress",
    headerName: "Progress",
    editable: false,
    flex: 0.5,
    minWidth: 150,
  },
  {
    field: "reqPayload",
    headerName: "Payload",
    flex: 3,
    minWidth: 300,
    editable: false,
    valueGetter: (params) => JSON.stringify(params.row?.reqPayload),
    renderCell: (params) => (
      <Code block>{JSON.stringify(params.row?.reqPayload)}</Code>
    ),
  },
  {
    field: "processed",
    headerName: "Processed",
    sortable: false,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "finished",
    headerName: "Finished",
    sortable: false,
    flex: 1,
    minWidth: 150,
  },
];

export const FailedGridColumn: GridColDef[] = [
  { field: "label", headerName: "Label", flex: 0.5 },
  {
    field: "timestamp",
    headerName: "Timestamp",
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: "reasonForFailure",
    headerName: "Fail Reason",
    minWidth: 150,
    flex: 2,
    editable: false,
    valueGetter: (params) => JSON.stringify(params.row?.reasonForFailure),
    renderCell: (params) => (
      <Code block>{JSON.stringify(params.row?.reasonForFailure)}</Code>
    ),
  },
  {
    field: "reqPayload",
    headerName: "Payload",
    flex: 2,
    minWidth: 300,
    editable: false,
    valueGetter: (params) => JSON.stringify(params.row?.reqPayload),
    renderCell: (params) => (
      <Code block>{JSON.stringify(params.row?.reqPayload)}</Code>
    ),
  },
  {
    field: "processed",
    headerName: "Processed",
    sortable: false,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "finished",
    headerName: "Finished",
    sortable: false,
    flex: 1,
    minWidth: 150,
  },
];

export const WaitingGridColumn: GridColDef[] = [
  { field: "label", headerName: "Label", flex: 0.5 },
  {
    field: "timestamp",
    headerName: "Timestamp",
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: "progress",
    headerName: "Progress",
    editable: false,
    flex: 0.5,
    minWidth: 150,
  },
  {
    field: "reqPayload",
    headerName: "Payload",
    flex: 3,
    minWidth: 300,
    editable: false,
    valueGetter: (params) => JSON.stringify(params.row?.reqPayload),
    renderCell: (params) => (
      <Code block>{JSON.stringify(params.row?.reqPayload)}</Code>
    ),
  },
];

export const ActiveGridColumn: GridColDef[] = [
  { field: "label", headerName: "Label", flex: 0.5 },
  {
    field: "timestamp",
    headerName: "Timestamp",
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: "progress",
    headerName: "Progress",
    editable: false,
    flex: 0.5,
    minWidth: 150,
  },
  {
    field: "reqPayload",
    headerName: "Payload",
    flex: 3,
    minWidth: 300,
    editable: false,
    valueGetter: (params) => JSON.stringify(params.row?.reqPayload),
    renderCell: (params) => (
      <Code block>{JSON.stringify(params.row?.reqPayload)}</Code>
    ),
  },
  {
    field: "processed",
    headerName: "Processed",
    sortable: false,
    flex: 1,
    minWidth: 150,
  },
];
