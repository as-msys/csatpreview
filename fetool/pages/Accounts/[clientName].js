import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import apiList from "../../apiRoutes/apiNames";
import { Grid, Typography } from "@mui/material";
import ProjectHeader from "../../src/components/pageHeader/ProjectHeader";
import Card from "../../src/components/Card";
import BreadCrumbs from "../../src/components/BreadCrumbs";
import InfoOutlined from "../../src/components/InfoOutlined";
import Nodata from "../../src/components/Nodata";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const clientName = () => {
  const router = useRouter();

  const clientName = router.query.clientName;

  //API CALL
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiList[2]}?populate=%2A`,
    fetcher
  );
  if (error)
    return <Typography variant="h2">"An error has occured"</Typography>;
  if (!data) return <Typography variant="h4">"Loading..."</Typography>;

  //Filtering the projects for the specific client
  const filteredClients = data.data.filter((item) => {
    const filteredOnes =
      item.attributes.client.data.attributes.name === clientName;
    return filteredOnes;
  });

  return (
    <>
      <BreadCrumbs pathofclient={clientName} />
      <ProjectHeader />
      <InfoOutlined />
      <Grid container rowSpacing={2} columnSpacing={2} padding={2}>
        {filteredClients.map((user) => (
          <Grid item md={3} key={user.id}>
            <Card
              clientname={user.attributes.name}
              pmname={user.attributes.project_manager.data.attributes.name}
              countofmembers={user.attributes.team_members.data.length}
              accountsindicator={false}
              surveyfrequency={user.attributes.survey_cadence.survey_frequency}
              sendbeforedate={user.attributes.survey_cadence.send_before}
            />
          </Grid>
        ))}
        {/* <Nodata /> */}
      </Grid>
    </>
  );
};

export default clientName;
