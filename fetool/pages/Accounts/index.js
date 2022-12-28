import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import useSWR from "swr";
import apiList from "../../apiRoutes/apiNames";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CardHeaderDesign from "../../src/components/CardHeader";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";

const Accounts = () => {
  const router = useRouter();
  const token = parseCookies().jwt;
  const [loggedInUser, setLoggedInUser] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const { data: accountData, error } = useSWR([
    `${process.env.NEXT_PUBLIC_API_URL}/${apiList[0]}?fields=name&populate=*`,
    token,
  ]);

  if (error) {
    router.push("/");
    toast.error(error.response.data.error.message);
  }

  if (!accountData) return <Typography variant="h4">"Loading..."</Typography>;

  //Filtering based on the logged in User
  const filteredAccountData = accountData.filter((account) => {
    const filteredAccounts =
      account.attributes.delivery_head.data.attributes.username ===
      loggedInUser;
    return filteredAccounts;
  });

  //To remove the original paddings in the bottom
  const CardContentStyled = styled(CardContent)({
    //MuiCardContent-root:last-child
    "&.MuiCardContent-root:last-child": {
      paddingBottom: "14px",
    },
  });

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="titleVariant">Accounts</Typography>
      <Grid container rowSpacing={2} columnSpacing={2} padding={2}>
        {accountData?.map((client) => (
          <Grid item md={3} key={client.id}>
            <Card
              variant="outlined"
              sx={{
                bgcolor: "#f5f5f5",
                border: "none",
                borderRadius: "3px",
              }}
            >
              <CardHeaderDesign
                clientName={client.attributes.name}
                pmName={
                  client.attributes.delivery_head.data.attributes.username
                }
              />
              <CardContentStyled
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="countVariant" sx={{ mt: 1.5 }}>
                  {client.attributes.projects.data.length} Project(s)
                </Typography>

                <Button
                  size="large"
                  sx={{ fontWeight: 700, color: "#FF4081" }}
                  onClick={() => {
                    router.push(`/Accounts/${client.attributes.name}`);
                  }}
                >
                  View
                </Button>
              </CardContentStyled>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Accounts;
