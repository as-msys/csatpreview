import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {
  Divider,
  Stack,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Radio,
} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import useSWR from "swr";
import apiList from "../../apiRoutes/apiNames";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { styled } from "@mui/material/styles";
import MultilineTextFields from "./openEnded";
import axios from "axios";
import { parseCookies } from "nookies";

const AccordionQuestion = ({ choosenTemplate }) => {
  const [open, setOpen] = useState(false);
  const [optionData, setOptionData] = useState([]);

  const token = parseCookies().jwt;

  const makeAPIcall = async (optionType) => {
    const resultedData = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${apiList[5]}?filters[question_option_type][label][$eq]=${optionType}&sort=value&populate=%2A`,
      { headers: { Authorization: "Bearer " + token } }
    );
    setOptionData(resultedData.data.data);
  };

  const { data: questionDetails, error } = useSWR([
    `${process.env.NEXT_PUBLIC_API_URL}/${apiList[3]}?filters[templates][name][$eq]=${choosenTemplate}&populate=question_option_type,question_type`,
    token,
  ]);
  if (error)
    return (
      <Typography variant="sx={{ m: 2 }}h2">"An error has occured"</Typography>
    );
  if (!questionDetails)
    return <Typography variant="h4">"Loading..."</Typography>;

  //Logic to push the open Ended question to the end
  for (let i = 0; i < questionDetails.length; i++) {
    if (
      questionDetails[i].attributes.question_type.data.attributes.label ===
      "Open Ended"
    ) {
      //swapping the open Ended question with the last one
      let temp = questionDetails[i];
      questionDetails[i] = questionDetails[questionDetails.length - 1];
      questionDetails[questionDetails.length - 1] = temp;
    }
  }

  const CustomExpandIcon = () => {
    return (
      <Box
        sx={{
          ".Mui-expanded & > .collapsIconWrapper": {
            display: "none",
          },
          ".expandIconWrapper": {
            display: "none",
          },
          ".Mui-expanded & > .expandIconWrapper": {
            display: "flex",
          },
        }}
      >
        <Box className="expandIconWrapper">
          <Typography
            color="secondary"
            sx={{ display: "inline", fontSize: "18px" }}
          >
            hide
          </Typography>
          <ArrowDropUpIcon style={{ color: "#ff4081" }} />
        </Box>
        <Box className="collapsIconWrapper" sx={{ display: "flex" }}>
          <Typography color="secondary" sx={{ fontSize: "18px" }}>
            show
          </Typography>
          <ArrowDropDownIcon style={{ color: "#ff4081" }} />
        </Box>
      </Box>
    );
  };

  const AccordionSummaryStyled = styled(AccordionSummary)({
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(360deg)",
    },
    "& .MuiAccordionSummary-collapsIconWrapper.Mui-expanded": {
      transform: "rotate(360deg)",
    },
  });

  return (
    <Box>
      {choosenTemplate !== "defaultText" && (
        <Typography sx={{ textAlign: "right", mr: -15 }}>
          <Typography variant="templateVariant">
            {questionDetails.length}
          </Typography>{" "}
          questions
        </Typography>
      )}
      {questionDetails?.map((question) => {
        return (
          <Box sx={{ ml: 2 }} key={question.id}>
            <Accordion
              key={question.id}
              onChange={() => {
                setOpen(true);
                makeAPIcall(
                  question.attributes.question_option_type.data?.attributes
                    .label
                );
              }}
              sx={{
                mt: 2,
                mb: 2,
                bgcolor: "#f5f5f5",
                borderRadius: "5px",
                width: "115%",
              }}
            >
              <AccordionSummaryStyled
                expandIcon={<CustomExpandIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Stack>
                  <Typography variant="templateVariant" sx={{ mb: 0.5 }}>
                    {question.attributes.questionText}
                    {question.attributes.isMandatory && (
                      <span
                        style={{
                          color: "red",
                          fontSize: "25px",
                        }}
                      >
                        {" "}
                        *
                      </span>
                    )}
                  </Typography>
                  {/* Option type is not required for open Ended question */}
                  {question.attributes.question_type.data.attributes.label !==
                    "Open Ended" && (
                    <Box sx={{ display: "flex", ml: 1.7 }}>
                      <Typography
                        sx={{ fontStyle: "italic", fontSize: "16px" }}
                        color="#757575"
                      >
                        Option Type:
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontStyle: "italic",
                          fontSize: "16px",
                        }}
                      >
                        {
                          question.attributes.question_option_type.data
                            .attributes.label
                        }
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </AccordionSummaryStyled>
              <Divider sx={{ mx: 2, opacity: 0.3 }} />
              {open && (
                <AccordionDetails>
                  {question.attributes.question_type.data.attributes.label ===
                  "Single Choice" ? (
                    <RadioGroup sx={{ ml: 2 }}>
                      {optionData?.map((option) => {
                        return (
                          <FormControlLabel
                            key={option.id}
                            label={option.attributes.label}
                            control={
                              <Radio
                                checked={false}
                                sx={{
                                  "& .MuiSvgIcon-root": {
                                    fontSize: 20,
                                  },
                                }}
                              />
                            }
                          />
                        );
                      })}
                    </RadioGroup>
                  ) : question.attributes.question_type.data.attributes
                      .label === "Multiple Choices" ? (
                    <RadioGroup sx={{ ml: 2 }}>
                      {optionData?.map((option) => {
                        return (
                          <FormControlLabel
                            control={<Checkbox checked={false} />}
                            label={option.attributes.label}
                          />
                        );
                      })}
                    </RadioGroup>
                  ) : (
                    <MultilineTextFields />
                  )}
                </AccordionDetails>
              )}
            </Accordion>
          </Box>
        );
      })}
    </Box>
  );
};

export default AccordionQuestion;
