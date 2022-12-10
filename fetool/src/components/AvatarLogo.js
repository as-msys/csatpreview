import React from "react";
import {
  HSLtoString,
  generateHSL,
  generateHSLForColor,
  stringAvatar,
} from "./AvatarGeneration";
import { Avatar } from "@mui/material";

const AvatarLogo = ({ clientName }) => {
  return (
    <Avatar
      sx={{
        bgcolor: HSLtoString(generateHSL(clientName)),
        color: HSLtoString(generateHSLForColor(clientName)),
        width: 50,
        height: 50,
        m: -1,
      }}
    >
      {stringAvatar(clientName)}
    </Avatar>
  );
};

export default AvatarLogo;
