import React, { useState } from "react";
import { Divider, Typography, Box, Button } from "@mui/material";
import Modal from "./Modal";

const DividerTextForProjects = ({ project, headerData, length }) => {
  const [openModal, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <Box key={project.id}>
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
        {headerData}({project.attributes.team_members.data.length})
      </Divider>
      {project.attributes.team_members.data.slice(0, length).map((employee) => {
        return (
          <Box sx={{ ml: 3, mr: 2 }} key={employee.id}>
            <Typography variant="body2">{employee.attributes.name}</Typography>
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
          headerData={"Project Members"}
          countofTeamMembers={project.attributes.team_members.data.length}
          employeeOfTheProject={project.attributes.team_members.data}
        />
      )}
    </Box>
  );
};

export default DividerTextForProjects;
