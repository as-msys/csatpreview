import * as React from "react";
import Card from "../../src/components/Card";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import useSWR from "swr";
import apiList from "../../apiRoutes/apiNames";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Accounts = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiList[0]}?populate=%2A`,
    fetcher
  ); //(uniquekey,fetcher function)
  if (error)
    return (
      <Typography variant="sx={{ m: 2 }}h2">"An error has occured"</Typography>
    );
  if (!data) return <Typography variant="h4">"Loading..."</Typography>;

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="myVariant">Accounts</Typography>
      <Grid container rowSpacing={2} columnSpacing={2} padding={2}>
        {data.data.map((user) => (
          <Grid item md={3} key={user.id}>
            <Card
              clientname={user.attributes.name}
              pmname={user.attributes.delivery_head.data.attributes.name}
              countofmembers={user.attributes.projects.data.length}
              uniqueid={user.id}
              routeindicator={true}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Accounts;
