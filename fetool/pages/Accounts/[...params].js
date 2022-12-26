import React, { useState, useEffect } from "react";
import { useRouter, isReady } from "next/router";
import BreadCrumbs from "../../src/components/BreadCrumbs";
import ProjectDetailHeader from "../../src/components/pageHeader/ProjectDetailHeader";
import HorizontalLabelPositionBelowStepper from "../../src/components/Stepper";
import Rightbar from "../../src/components/Layout/Rightbar";
import SelectVariants from "../../src/components/Dropdown";
import AccordionQuestion from "../../src/components/AccordianQuestion";
import POC from "../../src/components/POC";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { stringAvatar } from "../../src/components/AvatarGeneration";
import apiList from "../../apiRoutes/apiNames";
import axios from "axios";
import { parseCookies } from "nookies";

const steps = ["Point of Contact", "Survey Template"];

const projectName = () => {
  const router = useRouter();
  const [account, setAccount] = useState("");
  const [project, setProject] = useState("");

  useEffect(() => {
    if (router.isReady) {
      // Code using query
      const { params } = router.query;
      setAccount(params[0]);
      setProject(params[1]);
    }
  }, [router.isReady]);

  //To get jwt
  const token = parseCookies().jwt;

  const [activeStep, setActiveStep] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [template, setTemplate] = React.useState("defaultText");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [templateId, setTemplateId] = useState("");

  ///Preparing the fields for survey

  //Response Deadline Date
  const { surveyFrequency, daysLeft, projectId } = router.query;
  const DaysList = [14, 30, 50];
  const deadlineDate = new Date(daysLeft);

  if (surveyFrequency === "Quarterly") {
    var deadline = new Date(
      deadlineDate.setDate(deadlineDate.getDate() + DaysList[1])
    );
  } else if (surveyFrequency === "Monthly") {
    var deadline = new Date(
      deadlineDate.setDate(deadlineDate.getDate() + DaysList[0])
    );
  } else {
    var deadline = new Date(
      deadlineDate.setDate(deadlineDate.getDate() + DaysList[2])
    );
  }

  //To generate the name of the survey
  const currentDate = new Date();
  const surveyName = `${stringAvatar(
    account
  )}-${project}-${currentDate.getTime()}`;

  //To generate the slug Name
  const slugName = surveyName.split(" ").join("-").toLowerCase();

  //POST REQUEST
  const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response;
  };

  //Set the choosen template
  const handleChange = (event) => {
    setTemplate(event.target.value);
  };

  const handlePostRequest = async () => {
    //NEXT_PUBLIC as prefix to access it from clientside
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/${apiList[7]}?populate=%2A`,
        {
          //Makesure to add id's(not string) in order to post the relationship data in the backend
          data: {
            name: surveyName,
            slug: slugName,
            responseDeadlineDate: deadline,
            project: projectId,
            survey_status: 1,
            template: templateId,
            POC: {
              id: currentDate.getTime(),
              name: name,
              email: email,
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Handle success.
        router.push(`/Accounts/${params[0]}`);
        toast.success(`Survey for ${params[1]} is sent Sucessfully!`);
      })
      .catch((error) => {
        // Handle error.
        router.push(`/Accounts/${params[0]}`);
        toast.error(error.response.data.error.message);
      });
  };

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      //getting the current state and increasing it by 1
      setActiveStep((currentStep) => currentStep + 1);
    }
    //Activestep === 1
    if (activeStep === steps.length - 1) {
      handlePostRequest();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setDisabled(!disabled);
    setTemplate("defaultText");
  };

  return (
    <>
      <BreadCrumbs pathOfClient={account} pathOfProject={project} />
      <ProjectDetailHeader />

      <Rightbar project={project} />

      <HorizontalLabelPositionBelowStepper
        activeStep={activeStep}
        nextStep={nextStep}
        handleBack={handleBack}
        steps={steps}
        disabled={disabled}
        template={template}
      >
        {activeStep === 0 ? (
          <POC
            setDisabled={setDisabled}
            accountName={account}
            setName={setName}
            setEmail={setEmail}
          />
        ) : (
          <>
            <Typography variant="surveyVariant">
              Please choose a template for your survey
            </Typography>
            <SelectVariants handleChange={handleChange} setId={setTemplateId} />
            <AccordionQuestion choosenTemplate={template} />
          </>
        )}
      </HorizontalLabelPositionBelowStepper>
    </>
  );
};

export default projectName;
