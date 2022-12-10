import React from "react";
import { CardHeader, Typography, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import AvatarLogo from "./AvatarLogo";

const CardHeaderDesign = ({ clientName, pmName, daysLeft }) => {
  //Typography component
  const StyledTypography = styled(Typography)({
    maxHeight: "1.5rem",
    color: "#212121",
    fontSize: "15px",
    letterSpacing: "0.15px",
  });

  return (
    <CardHeader
      avatar={<AvatarLogo clientName={clientName} />}
      action={
        typeof daysLeft === "number" && (
          <Stack direction="row" spacing={0.7}>
            <Box className="circle" sx={{ mt: 0.7 }}></Box>
            <StyledTypography sx={{ letterSpacing: "0.9" }}>
              {daysLeft}days left
            </StyledTypography>
          </Stack>
        )
      }
      titleTypographyProps={{
        fontSize: 17,
        letterSpacing: "0.1px",
      }}
      subheaderTypographyProps={{
        fontSize: 15,
        letterSpacing: "0.17px",
      }}
      title={clientName}
      subheader={pmName}
    />
  );
};

export default CardHeaderDesign;
