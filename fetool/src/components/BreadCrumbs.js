import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";

const BreadCrumbs = ({ pathofclient, pathofproject }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ m: 3 }}>
      <Link underline="hover" color="inherit" href="/Accounts">
        <Typography variant="body1">Accounts</Typography>
      </Link>
      <Link
        color="secondary"
        underline="hover"
        style={{ textDecoration: "none" }}
      >
        <Typography variant="body1">{pathofclient}</Typography>
      </Link>
      {pathofproject !== undefined ? (
        <Link color="secondary" style={{ textDecoration: "none" }}>
          <Typography variant="body1">{pathofproject}</Typography>
        </Link>
      ) : null}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
