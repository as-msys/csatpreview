import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";

const BreadCrumbs = ({ pathOfClient, pathOfProject }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ m: 3 }}>
      <Link underline="hover" color="inherit" href="/Accounts">
        <Typography variant="body1">Accounts</Typography>
      </Link>
      {pathOfProject === undefined ? (
        <Link color="secondary" style={{ textDecoration: "none" }}>
          <Typography variant="body1">{pathOfClient}</Typography>
        </Link>
      ) : (
        <Link
          color="inherit"
          underline="hover"
          href={`/Accounts/${pathOfClient}`}
        >
          <Typography variant="body1">{pathOfClient}</Typography>
        </Link>
      )}

      {pathOfProject !== undefined ? (
        <Link color="secondary" style={{ textDecoration: "none" }}>
          <Typography variant="body1">{pathOfProject}</Typography>
        </Link>
      ) : null}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
