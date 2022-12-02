import React, { useState } from "react";
// import ToggleButton from "../ToggleButton";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";

const ProjectHeader = () => {
  // //Setting the state to toggle between the views
  // const [viewCard, setViewCard] = useState("module");

  //Setting the view of the page
  const getView = (data) => {
    setViewCard(data);
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", marginTop: -1 }}
    >
      <Typography variant="h4" sx={{ mx: 3, mb: 3 }}>
        Projects
      </Typography>
      {/* <ToggleButton onChangeOfView={getView} /> */}
    </Box>
  );
};

export default ProjectHeader;
