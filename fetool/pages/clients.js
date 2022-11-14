import React from "react";
import useSWR from "swr";
import { Box } from "@mui/system";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import apiList from "../apiRoutes/apiNames";

const fetcher = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiList[0]}?fields=name&populate=delivery_head%2Cpoint_of_contacts%2Cprojects`
  );
  const clientData = response.data;
  return clientData;
};

const Client = () => {
  const { data, error } = useSWR("clientDetails", fetcher); //(uniquekey,fetcher function)
  if (error) return "An error has occured";
  if (!data) return "Loading";

  return (
    <>
      <Box variant="container">
        <h1>Client Collections</h1>

        {data.data.map((user) => (
          <Card
            key={user.id}
            variant="outlined"
            style={{
              width: "50vw",
              marginTop: "1rem",
              backgroundColor: "#ADD8E6",
            }}
          >
            <CardContent>
              <div>
                <Typography>
                  <b>Name of the Client- </b>
                  {user.attributes.name}
                </Typography>

                <Typography>
                  {" "}
                  <b>Name of the delivery Head:</b>{" "}
                  {user.attributes.delivery_head.data.attributes.name}
                </Typography>
                {user.attributes.projects.data.map((project) => {
                  return (
                    <div key={project.id}>
                      <Typography>
                        <b>ProjectName:</b>
                        {project.attributes.name}
                      </Typography>
                      <Typography>
                        <b>sow_start_date:</b>
                        {project.attributes.sow_start_date}
                      </Typography>
                    </div>
                  );
                })}
                {user.attributes.point_of_contacts.map((person) => {
                  return (
                    <div key={person.id}>
                      <Typography>
                        <b>POC:</b>
                        {person.name}
                      </Typography>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default Client;
