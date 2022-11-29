import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";

const BreadCrumbs = ({ clientName }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ m: 3 }}>
      <Link underline="hover" color="inherit" href="/Accounts">
        <Typography variant="body1">Accounts</Typography>
      </Link>
      <Link color="secondary" style={{ textDecoration: "none" }}>
        <Typography variant="body1">{clientName}</Typography>
      </Link>
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
