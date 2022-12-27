import React, { useState } from "react";
import { styled, Typography, Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/router";
import useSWR from "swr";
import apiList from "../apiRoutes/apiNames";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import SendIcon from "@mui/icons-material/Send";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DraftsIcon from "@mui/icons-material/Drafts";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import axios from "axios";
import { parseCookies } from "nookies";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.primary.main,
    fontSize: 18,
    fontWeight: "700",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const token = parseCookies().jwt;

  const { data: surveyData, error } = useSWR([
    `${process.env.NEXT_PUBLIC_API_URL}/${apiList[7]}?populate=%2A`,
    token,
  ]);
  if (error)
    return (
      <Typography variant="sx={{ m: 2 }}h2">"An error has occured"</Typography>
    );
  if (!surveyData) return <Typography variant="h4">"Loading..."</Typography>;

  const actionItems = [
    {
      action: "Completed",
      icon: <VisibilityIcon color="secondary" />,
    },
    {
      action: "New",
      icon: <OpenInNewIcon color="secondary" />,
    },
    {
      action: "InDraft",
      icon: <DraftsIcon color="secondary" />,
    },
    {
      action: "InProgress",
      icon: <SendIcon color="secondary" />,
    },
    {
      action: "Overdue",
      icon: <ScheduleSendIcon color="secondary" />,
    },
  ];

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - surveyData.data.length)
      : 0;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mr: 7 }}>
        <Typography variant="titleVariant">Surveys</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Tooltip title="Filter list">
            <IconButton sx={{ ml: -2, p: 3 }}>
              <FilterListIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Typography component="span" color="#3F51B5" sx={{ mt: 3.5 }}>
            FILTERS
          </Typography>
        </Box>
      </Box>

      <Box sx={{ borderRadius: 3 }}>
        <TableContainer sx={{ width: "95%", m: 2 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Survey Name</StyledTableCell>

                <StyledTableCell align="right">Project Name</StyledTableCell>

                <StyledTableCell align="right">
                  Response Deadline Date
                </StyledTableCell>

                <StyledTableCell align="right">Status</StyledTableCell>

                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ mb: 1 }}>
              {surveyData.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.attributes.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {/* {row.attributes.project.data.attributes.name} */}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.attributes.responseDeadlineDate}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {/* {row.attributes.survey_status.data.attributes.status} */}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Tooltip title={actionItems[1].action}>
                      {actionItems[1].icon}
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20]}
          component="Box"
          count={surveyData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
}
