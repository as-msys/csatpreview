import React, { useState, useEffect } from "react";
import { Box, CardHeader, Drawer, Typography, Divider } from "@mui/material";
import useSWR from "swr";
import apiList from "../../../apiRoutes/apiNames";
import AvatarLogo from "../AvatarLogo";
import DividerTextForProjects from "../DividerText";
import DividerTextForSurveys from "../DividerTextForSurveys";
import format from "date-fns/format";
import { useRouter, isReady } from "next/router";
import { parseCookies } from "nookies";

const drawerWidth = "25rem";
const month = new Date().toLocaleString("en-us", { month: "short" });
const year = new Date().getFullYear();

const PermanentDrawerRight = () => {
  const [project, setProject] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      // Code using query
      const { params } = router.query;

      setProject(params[1]);
    }
  }, [router.isReady]);

  const token = parseCookies().jwt;

  const { data: projectData, error } = useSWR([
    `${process.env.NEXT_PUBLIC_API_URL}/${apiList[2]}?filters[name][$eq]=${project}&populate=%2A`,
    token,
  ]);
  const { data: surveyData, surveyError } = useSWR([
    `${process.env.NEXT_PUBLIC_API_URL}/${apiList[7]}?filters[project][name][$eq]=${project}&populate=*`,
    token,
  ]);

  if (error) {
    toast.error(error.response.data.error.message);
  }
  if (surveyError) {
    toast.error(surveyError.response.data.error.message);
  }

  if (!projectData || !surveyData)
    return <Typography variant="h4">"Loading..."</Typography>;

  const noOfSurveys = surveyData.length;

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            boxShadow: "-2px 0px 4px 0px #00000015",
          },
        }}
        variant="permanent"
        anchor="right"
      >
        {projectData?.map((projectInfo) => {
          return (
            <Box key={projectInfo.id}>
              <CardHeader
                sx={{ m: 2, lineHeight: 1, mt: 1 }}
                avatar={<AvatarLogo clientName={projectInfo.attributes.name} />}
                titleTypographyProps={{
                  fontSize: 20,
                  fontWeight: "600",
                  lineHeight: 1,
                  marginLeft: "1rem",
                }}
                subheaderTypographyProps={{
                  marginLeft: "1rem",
                }}
                title={projectInfo.attributes.name}
                subheader={
                  projectInfo.attributes.projectManager.data.attributes.name
                }
              />
              <Box sx={{ ml: 3, mt: -1 }}>
                <Typography variant="body2">SOW Start Date</Typography>
                <Typography variant="subtitle2">
                  {format(
                    new Date(projectInfo.attributes.sow_start_date),
                    "dd/MM/yyyy"
                  )}
                </Typography>
                <Typography variant="body2">Survey Frequency</Typography>
                <Typography variant="subtitle2">
                  {projectInfo.attributes.survey_cadence.survey_frequency}
                </Typography>
                <Typography variant="body2">Send Before Date</Typography>
                <Typography variant="subtitle2">
                  {projectInfo.attributes.survey_cadence.send_before} {month}{" "}
                  {year}
                </Typography>
              </Box>
              <DividerTextForProjects
                project={projectInfo}
                headerData={"Project Members"}
                length={4}
              />
            </Box>
          );
        })}
        <DividerTextForSurveys
          survey={surveyData}
          headerData={"Past Surveys"}
          length={4}
        />
      </Drawer>
    </Box>
  );
};

export default PermanentDrawerRight;
