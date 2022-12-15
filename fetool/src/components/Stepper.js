import React, { useState } from "react";
import {
  StepLabel,
  Step,
  Stepper,
  styled,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import PopupDialog from "./PopupDialog";

//To change the stepper color based on the status
const StyledStepper = styled(Stepper)({
  "& .MuiStepIcon-root.Mui-active": {
    color: "#ff4081",
  },
  "& .MuiSvgIcon-root.Mui-completed": {
    color: "#ff4081",
  },
});

const HorizontalLabelPositionBelowStepper = ({
  children,
  handleBack,
  nextStep,
  activeStep,
  steps,
  disabled,
  template,
}) => {
  const router = useRouter();
  const { params = [] } = router.query;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    router.push(`/Accounts/${params[0]}`);
  };

  return (
    <Box sx={{ mx: 2, mb: 6, width: "60%" }}>
      <StyledStepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </StyledStepper>
      <Box
        sx={{
          mt: 4,
          ml: -1.5,
          mb: activeStep === 0 ? 20 : template === "defaultText" ? 45 : 10,
        }}
      >
        {children}
      </Box>

      {open && <PopupDialog open={open} handleClose={handleClose} />}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 700,
        }}
      >
        <Button
          color="inherit"
          size="large"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ ml: 1, mb: 4 }}
        >
          BACK
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            ml: 65,
            mr: -15,
          }}
        >
          <Button
            variant="text"
            size="large"
            color="disabled"
            sx={{ mr: 2, mb: 4 }}
            onClick={handleClickOpen}
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={disabled}
            size="large"
            sx={{ mb: 4 }}
            onClick={() => nextStep()}
          >
            {activeStep === 0 ? "NEXT" : "SEND SURVEY"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HorizontalLabelPositionBelowStepper;
