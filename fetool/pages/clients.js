import React from "react";
import useSWR from "swr";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import apiList from "../apiRoutes/apiNames";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Client = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiList[0]}?fields=name&populate=delivery_head%2Cpoint_of_contacts%2Cprojects`,
    fetcher
  ); //(uniquekey,fetcher function)
  if (error)
    return <Typography variant="h2">"An error has occured"</Typography>;
  if (!data) return <Typography variant="h4">"Loading..."</Typography>;

  return (
    <>
      <Box variant="container">
        <Typography variant="h3" gutterBottom sx={{ mt: "2rem" }}>
          Client Collections
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data.data.map((user) => (
            <Grid item xs={2} sm={4} md={3} key={user.id} mx={2}>
              <Card variant="outlined">
                <CardContent>
                  <div>
                    <Typography variant="h6">
                      <b>Name of the Client- </b>
                      {user.attributes.name}
                    </Typography>

                    <Typography variant="h6">
                      {" "}
                      <b>Name of the delivery Head:</b>{" "}
                      {user.attributes.delivery_head.data.attributes.name}
                    </Typography>
                    {user.attributes.projects.data.map((project) => {
                      return (
                        <div key={project.id}>
                          <Typography variant="h6">
                            <b>ProjectName:</b>
                            {project.attributes.name}
                          </Typography>
                          <Typography variant="h6">
                            <b>sow_start_date:</b>
                            {project.attributes.sow_start_date}
                          </Typography>
                        </div>
                      );
                    })}
                    {user.attributes.point_of_contacts.map((person) => {
                      return (
                        <div key={person.id}>
                          <Typography variant="h6">
                            <b>POC:</b>
                            {person.name}
                          </Typography>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Client;
