import React, { useState } from "react";
import useSWR from "swr";
import apiList from "../../apiRoutes/apiNames";
import AvatarLogo from "../../src/components/AvatarLogo";
import {
  Typography,
  Card,
  CardHeader,
  CardActionArea,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";

const POC = ({ setDisabled }) => {
  const router = useRouter();
  const { params } = router.query;
  const [id, setId] = useState("");
  const [active, setIsActive] = useState(false);

  const { data: clientDetails, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiList[0]}?filters[name][$eq]=${params[0]}&populate=point_of_contacts`
  );
  if (error)
    return (
      <Typography variant="h2" sx={{ m: 2 }}>
        "An error has occured"
      </Typography>
    );
  if (!clientDetails) return <Typography variant="h4">"Loading..."</Typography>;

  const matchId = (pocId) => {
    setId(pocId);
    setIsActive(!active);
    setDisabled(active);
  };

  return (
    <>
      <Typography variant="surveyVariant">
        Please choose a point of contact to send a survey to
      </Typography>
      {clientDetails.data.map((client) => {
        return (
          <Box key={client.id}>
            {client.attributes.point_of_contacts.map((poc) => {
              return (
                <Card
                  key={poc.id}
                  variant="outlined"
                  onClick={() => matchId(poc.id)}
                  sx={{
                    borderRadius: "5px",
                    marginTop: "2rem",
                    marginLeft: "2rem",
                    width: "45%",
                    bgcolor:
                      active && id === poc.id
                        ? "rgba(198,203,230,0.75)"
                        : "none",
                  }}
                >
                  <CardActionArea>
                    <CardHeader
                      avatar={<AvatarLogo clientName={poc.name} />}
                      titleTypographyProps={{
                        fontSize: 18,
                        fontWeight: "600",
                        lineHeight: 1,
                        marginLeft: "0.5rem",
                        letterSpacing: "0.0001071em",
                      }}
                      subheaderTypographyProps={{
                        marginLeft: "0.5rem",
                      }}
                      title={poc.name}
                      subheader={poc.email}
                    />
                  </CardActionArea>
                </Card>
              );
            })}
          </Box>
        );
      })}
    </>
  );
};

export default POC;
