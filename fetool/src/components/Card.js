import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Button,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

const clientName = ({
  clientname,
  pmname,
  countofmembers,
  accountsindicator,
  surveyfrequency,
  sendbeforedate,
}) => {
  const router = useRouter();
  const pathname = router.pathname;

  //To get the current day of the month
  const date = new Date();
  let currentDay = date.getDate();

  //To remove the original paddings in the bottom
  const CardContentStyled = styled(CardContent)({
    //MuiCardContent-root:last-child
    "&.MuiCardContent-root:last-child": {
      paddingBottom: "14px",
    },
  });

  //Typography component
  const StyledTypography = styled(Typography)({
    maxHeight: "1.5rem",
    color: "#212121",
    fontSize: "15px",
    letterSpacing: "0.15px",
  });

  //To design the letters in Avatar
  const stringAvatar = (name) => {
    let avatarName = name[0];
    if (name.indexOf(" ") >= 0) {
      const newName = name.split(" ");
      avatarName = newName[0][0] + newName[1][0];
    }
    return avatarName;
  };

  //Randomizing the avatar colour
  const getHashOfString = (string) => {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    return hash;
  };

  const normalizeHash = (hash, min, max) => {
    return Math.floor((hash % (max - min)) + min);
  };

  const hRange = [0, 360];
  const sRange = [30, 50];
  const lRange = [80, 90];

  const generateHSL = (name) => {
    const hash = getHashOfString(name);
    const h = normalizeHash(hash, hRange[0], hRange[1]);
    const s = normalizeHash(hash, sRange[0], sRange[1]);
    const l = normalizeHash(hash, lRange[0], lRange[1]);
    return [h, s, l];
  };

  const generateHSLForColor = (name) => {
    const hash = getHashOfString(name);
    const h = normalizeHash(hash, hRange[0], hRange[1]);
    const s = normalizeHash(hash, sRange[0] + 60, sRange[1] + 50);
    const l = normalizeHash(hash, lRange[0] - 70, lRange[1] - 70);
    return [h, s, l];
  };

  const HSLtoString = (hsl) => {
    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  };

  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: "#f5f5f5",
        border: "none",
        borderRadius: "3px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: HSLtoString(generateHSL(clientname)),
                color: HSLtoString(generateHSLForColor(clientname)),
                width: 50,
                height: 50,
                m: -1,
              }}
            >
              {stringAvatar(clientname)}
            </Avatar>
          }
          action={
            !accountsindicator && (
              <Stack direction="row" spacing={0.4}>
                <Box className="circle" sx={{ mt: 0.6, ml: 6 }}></Box>
                <StyledTypography sx={{ letterSpacing: "0.09" }}>
                  {sendbeforedate - currentDay} days left
                </StyledTypography>
              </Stack>
            )
          }
          sx={{
            lineHeight: "20.8px",
            letterSpacing: "0.10px",
            overflow: "hidden",
            pt: "22px",
            px: "22px",
          }}
          titleTypographyProps={{
            fontSize: 17,
            letterSpacing: "0.15px",
          }}
          subheaderTypographyProps={{
            fontSize: 15,
            letterSpacing: "0.17px",
          }}
          title={clientname}
          subheader={pmname}
        />
      </Box>
      <CardContentStyled
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {pathname.includes("[clientName]") ? (
          <Typography variant="newVariant" sx={{ mt: 1.5 }}>
            {countofmembers} Member(s)
          </Typography>
        ) : (
          <Typography variant="newVariant" sx={{ mt: 1.5 }}>
            {countofmembers} Project(s)
          </Typography>
        )}

        <Button
          size="large"
          sx={{ fontWeight: 700, color: "#EF5350" }}
          onClick={() => router.push(`/Accounts/${clientname}`)}
        >
          View
        </Button>
      </CardContentStyled>
    </Card>
  );
};

export default clientName;
