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

const POC = () => {
  const router = useRouter();
  const { params } = router.query;

  const { data: clientDetails, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiList[0]}?populate=%2A`
  );
  if (error)
    return (
      <Typography variant="h2" sx={{ m: 2 }}>
        "An error has occured"
      </Typography>
    );
  if (!clientDetails) return <Typography variant="h4">"Loading..."</Typography>;

  //Filtering the poc for the choosen project
  const filteredPOC = clientDetails.data.filter((poc) => {
    const filteredOnes = poc.attributes.name === params[0];
    return filteredOnes;
  });

  return (
    <>
      <Typography variant="surveyVariant">
        Please choose a point of contact to send a survey to
      </Typography>
      {filteredPOC.map((client) => {
        return (
          <Box key={client.id}>
            {client.attributes.point_of_contacts.map((poc) => {
              return (
                <Card
                  key={poc.id}
                  variant="outlined"
                  sx={{
                    borderRadius: "5px",
                    marginTop: "2rem",
                    marginLeft: "2rem",
                    width: "45%",
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