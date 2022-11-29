import * as React from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function VerticalToggleButtons({ onChangeOfView }) {
  const [view, setView] = React.useState("module");

  const handleChange = (event, nextView) => {
    setView(nextView);
    onChangeOfView(view);
  };

  return (
    <ToggleButtonGroup
      orientation="horizontal"
      value={view}
      exclusive
      sx={{
        color: "#212121",
        padding: 1,
        position: "fixed",
        top: "6%",
        left: "90%",
      }}
      onChange={handleChange}
    >
      <ToggleButton value="module" aria-label="module">
        <ViewModuleIcon />
      </ToggleButton>
      <ToggleButton value="list" aria-label="list">
        <ViewListIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
