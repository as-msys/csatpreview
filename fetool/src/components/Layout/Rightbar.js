import * as React from "react";
import { Box, CardHeader, Drawer, Typography } from "@mui/material";
import useSWR from "swr";
import apiList from "../../../apiRoutes/apiNames";
import AvatarLogo from "../AvatarLogo";
import DividerText from "../DividerText";
import format from "date-fns/format";

const drawerWidth = "25rem";
const month = new Date().toLocaleString("en-us", { month: "short" });
const year = new Date().getFullYear();

const PermanentDrawerRight = ({ project }) => {
  const { data: projectDetails, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiList[2]}?populate=%2A`
  );
  if (error)
    return (
      <Typography variant="sx={{ m: 2 }}h2">"An error has occured"</Typography>
    );
  if (!projectDetails)
    return <Typography variant="h4">"Loading..."</Typography>;

  //Filtering the poc for the choosen project
  const projectData = projectDetails.data.filter((projectName) => {
    const filteredOnes = projectName.attributes.name === project;
    return filteredOnes;
  });

  const styles = {
    width: drawerWidth,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
    },
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          ...styles,
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
        {projectData.map((projectInfo) => {
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
                  projectInfo.attributes.project_manager.data.attributes.name
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
              <DividerText
                project={project}
                headerData={"Project Members"}
                length={4}
              />
            </Box>
          );
        })}
      </Drawer>
    </Box>
  );
};

export default PermanentDrawerRight;
