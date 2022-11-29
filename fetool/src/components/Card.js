import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Button,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { Router, useRouter } from "next/router";

const clientName = ({
  clientname,
  pmname,
  countofmembers,
  uniqueid,
  routeindicator,
}) => {
  const router = useRouter();
  const pathname = router.pathname;

  //To remove the original paddings in the bottom
  const CardContentStyled = styled(CardContent)({
    //MuiCardContent-root:last-child
    "&.MuiCardContent-root:last-child": {
      paddingBottom: "14px",
    },
  });

  const StyledButton = styled(Button)({
    "&.Mui-disabled": {
      color: "#ff4081",
      opacity: "0.6",
    },
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
  const stringToColor = (string) => {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
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
                bgcolor: stringToColor(clientname),
                width: 50,
                height: 50,
                m: -1,
              }}
            >
              {stringAvatar(clientname)}
            </Avatar>
          }
          action={
            !routeindicator ? (
              <>
                {uniqueid % 2 !== 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <Box
                      className="circle"
                      sx={{
                        mr: "0.2rem",
                        letterSpacing: "0.17px",
                        lineHeight: "17.16px",
                      }}
                    ></Box>
                    <Typography variant="newVariant" sx={{ color: "#212121" }}>
                      OverDue
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex" }}>
                    <Box className="circle2" sx={{ mr: "0.2rem" }}></Box>
                    <Typography variant="newVariant" sx={{ color: "#212121" }}>
                      Completed
                    </Typography>
                  </Box>
                )}
              </>
            ) : null
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

        {uniqueid % 2 !== 0 && !routeindicator ? (
          <StyledButton disabled size="large" sx={{ fontWeight: 700 }}>
            View
          </StyledButton>
        ) : (
          <Button
            size="large"
            sx={{ fontWeight: 700, color: "#EF5350" }}
            onClick={() => router.push(`/Accounts/${clientname}`)}
          >
            View
          </Button>
        )}
      </CardContentStyled>
    </Card>
  );
};

export default clientName;
