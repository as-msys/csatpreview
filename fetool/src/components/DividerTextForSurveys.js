import React, { useState } from "react";
import { Divider, Typography, Box, Button } from "@mui/material";
import Modal from "./Modal";

const DividerTextForSurveys = ({ survey, headerData, length }) => {
  const [openModal, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  console.log(survey);
  return (
    <Box key={survey.id}>
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
        {headerData}({survey.data.length})
      </Divider>
      {survey.data.length ? (
        survey.data.slice(0, length).map((surveyItem) => {
          return (
            <Box sx={{ ml: 3, mr: 2 }} key={surveyItem.id}>
              <Typography variant="body2">
                {surveyItem.attributes.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                {surveyItem.attributes.responseDeadlineDate}
              </Typography>
              <Divider sx={{ mb: 1, opacity: 0.4 }} />
            </Box>
          );
        })
      ) : (
        <Typography sx={{ m: 2 }}>
          There are no past surveys to display!
        </Typography>
      )}

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
          headerData={"Past Surveys"}
          countofTeamMembers={survey.data.length}
          employeeOfTheProject={survey.data}
        />
      )}
    </Box>
  );
};

export default DividerTextForSurveys;
