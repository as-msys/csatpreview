import React from "react";
import { Box } from "@mui/system";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link, Typography } from "@mui/material";

const InfoOutlined = () => {
  return (
    <Box style={{ display: "flex", marginLeft: "1rem", marginBottom: "1rem" }}>
      <InfoOutlinedIcon sx={{ mr: "0.5rem", color: "#757575", fontSize: 28 }} />
      <Typography variant="subtitle1" sx={{ color: "#757575" }}>
        Only projects for which the surveys are pending for this month are
        displayed.To view all surveys,Please go to{" "}
        <Link color="secondary" href="/surveys">
          surveys{" "}
        </Link>
      </Typography>
    </Box>
  );
};

export default InfoOutlined;
