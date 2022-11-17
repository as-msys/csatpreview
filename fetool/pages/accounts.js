import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import useSWR from "swr";
import apiList from "../apiRoutes/apiNames";
import { styled } from "@mui/material/styles";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Accounts = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiList[0]}?populate=%2A`,
    fetcher
  ); //(uniquekey,fetcher function)
  if (error)
    return <Typography variant="h2">"An error has occured"</Typography>;
  if (!data) return <Typography variant="h4">"Loading..."</Typography>;

  const cardContentStyled = styled(CardContent)({
    "&& .MuiCardHeader-root": {
      paddingBottom: 0,
    },
  });

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="myVariant" gutterBottom m={3}>
        Accounts
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        padding={2}
      >
        {data.data.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card variant="outlined">
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#7879F1", width: 60, height: 60 }}>
                    {user.attributes.name[0]}
                  </Avatar>
                }
                title={user.attributes.name}
                subheader={user.attributes.delivery_head.data.attributes.name}
              />

              <cardContentStyled
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="newVariant" sx={{ paddingX: "1rem" }}>
                  {user.attributes.projects.data.length} Project(s)
                </Typography>
                <Button color="buttonColor" sx={{ fontWeight: 700 }}>
                  View
                </Button>
              </cardContentStyled>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Accounts;
