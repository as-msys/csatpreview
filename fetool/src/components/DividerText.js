import React, { useState } from "react";
import { Divider, Typography, Box, Button } from "@mui/material";
import useSWR from "swr";
import apiList from "../../apiRoutes/apiNames";
import Modal from "./Modal";

const DividerText = ({ project, headerData, length }) => {
  const [openModal, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  //API CALL
  const { data: projectDetails, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiList[2]}?populate=%2A`
  );
  if (error)
    return <Typography variant="h2">"An error has occured"</Typography>;
  if (!projectDetails)
    return <Typography variant="h4">"Loading..."</Typography>;

  const projectData = projectDetails.data.filter((projectName) => {
    const filteredOnes = projectName.attributes.name === project;
    return filteredOnes;
  });

  return (
    <>
      {projectData?.map((projectInfo) => {
        return (
          <Box key={projectInfo.id}>
            <Divider
              textAlign="left"
              sx={{
                fontSize: "17px",
                fontWeight: 600,
                color: "#3F51B5",
                marginBottom: "0.5rem",
                marginTop: 0,
              }}
            >
              {headerData}({projectInfo.attributes.team_members.data.length})
            </Divider>
            {projectInfo.attributes.team_members.data
              .slice(0, length)
              .map((employee) => {
                return (
                  <Box sx={{ ml: 3, mr: 2 }} key={employee.id}>
                    <Typography variant="body2">
                      {employee.attributes.name}
                    </Typography>

                    <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                      {employee.attributes.employee_code}
                    </Typography>
                    <Divider sx={{ mb: 1, opacity: 0.4 }} />
                  </Box>
                );
              })}

            <Button
              variant="text"
              color="secondary"
              sx={{
                ml: 35,
                textTransform: "none",
                fontSize: "15px",
                mt: -1,
              }}
              onClick={handleOpen}
            >
              View all
            </Button>
            {openModal && (
              <Modal
                openModal={openModal}
                handleClose={handleClose}
                countofTeamMembers={
                  projectInfo.attributes.team_members.data.length
                }
                employeeOfTheProject={projectInfo.attributes.team_members.data}
              />
            )}
          </Box>
        );
      })}
    </>
  );
};

export default DividerText;
