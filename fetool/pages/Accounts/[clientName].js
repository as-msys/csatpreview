import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import apiList from "../../apiRoutes/apiNames";
import ProjectHeader from "../../src/components/pageHeader/ProjectHeader";
import BreadCrumbs from "../../src/components/BreadCrumbs";
import InfoOutlined from "../../src/components/InfoOutlined";
import CardHeaderDesign from "../../src/components/CardHeader";
import NoData from "../../src/components/NoData";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Drawer,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SurveyLogic from "../../src/components/SurveyLogic";

const accountName = () => {
  const router = useRouter();

  const clientName = router.query.clientName;

  //Date Calculation
  const date = new Date();
  let currentDay = date.getDate();
  let currentMonth = date.getMonth() + 1;

  //API CALL
  const { data: projectDetails, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiList[2]}?filters[client][name][$eq]=${clientName}&populate=%2A`
  );
  if (error)
    return <Typography variant="h2">"An error has occured"</Typography>;
  if (!projectDetails)
    return <Typography variant="h4">"Loading..."</Typography>;

  const pendingSurveysList = SurveyLogic(
    projectDetails.data,
    currentMonth,
    currentDay
  );

  //To remove the original paddings in the bottom
  const CardContentStyled = styled(CardContent)({
    //MuiCardContent-root:last-child
    "&.MuiCardContent-root:last-child": {
      paddingBottom: "14px",
    },
  });

  return (
    <>
      <BreadCrumbs pathOfClient={clientName} />
      <ProjectHeader />
      {pendingSurveysList.length > 0 ? <InfoOutlined /> : <NoData />}
      <Grid container rowSpacing={2} columnSpacing={2} padding={2}>
        {pendingSurveysList.map((project) => (
          <Grid item md={3} key={project.id}>
            <Card
              variant="outlined"
              sx={{
                bgcolor: "#f5f5f5",
                border: "none",
                borderRadius: "3px",
              }}
            >
              <CardHeaderDesign
                clientName={project.attributes.name}
                pmName={project.attributes.project_manager.data.attributes.name}
                daysLeft={
                  project.attributes.survey_cadence.send_before - currentDay
                }
              />
              <CardContentStyled
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="countVariant" sx={{ mt: 1.5 }}>
                  {project.attributes.team_members.data.length} Member(s)
                </Typography>

                <Button
                  size="large"
                  sx={{ fontWeight: 700, color: "#FF4081" }}
                  onClick={() =>
                    router.push(
                      `/Accounts/${clientName}/${project.attributes.name}`
                    )
                  }
                >
                  View
                </Button>
              </CardContentStyled>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default accountName;
