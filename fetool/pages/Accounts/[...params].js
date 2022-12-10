import React, { useState } from "react";
import { useRouter } from "next/router";
import BreadCrumbs from "../../src/components/BreadCrumbs";
import ProjectDetailHeader from "../../src/components/pageHeader/ProjectDetailHeader";
import HorizontalLabelPositionBelowStepper from "../../src/components/Stepper";
import Rightbar from "../../src/components/Layout/Rightbar";
import SelectVariants from "../../src/components/Dropdown";
import Questions from "../../src/components/Questions";
import AccordionQuestion from "../../src/components/AccordianQuestion";
import POC from "../../src/components/POC";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";

const steps = ["Point of Contact", "Survey Template"];

const projectName = () => {
  const router = useRouter();
  const { params } = router.query;
  const projectNameInLowerCase = params[1].toLowerCase();
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      //getting the current state and increasing it by 1
      setActiveStep((currentStep) => currentStep + 1);
    }
    if (activeStep === steps.length - 1) {
      router.push(`/Accounts/${params[0]}`);
      toast.success(
        <Box sx={{ p: 0.5 }}>
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            Survey Sent!
          </Typography>
          <Typography
            sx={{ fontSize: "16px" }}
          >{`The survey for ${projectNameInLowerCase} was sent sucessfully.`}</Typography>
        </Box>
      );
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <BreadCrumbs pathOfClient={params[0]} pathOfProject={params[1]} />
      <ProjectDetailHeader />

      <Rightbar project={params[1]} />

      <HorizontalLabelPositionBelowStepper
        activeStep={activeStep}
        nextStep={nextStep}
        handleBack={handleBack}
        steps={steps}
      >
        {activeStep === 0 ? (
          <POC />
        ) : (
          <>
            <Typography variant="surveyVariant">
              Please choose a template for your survey
            </Typography>
            <SelectVariants />
            <AccordionQuestion />
          </>
        )}
      </HorizontalLabelPositionBelowStepper>
    </>
  );
};

export default projectName;
