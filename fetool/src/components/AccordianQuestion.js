import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Divider, Stack, Typography, Box } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import useSWR from "swr";
import apiList from "../../apiRoutes/apiNames";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { styled } from "@mui/material/styles";

const AccordionQuestion = ({ choosenTemplate }) => {
  const { data: questionDetails, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiList[3]}?populate=%2A`
  );
  if (error)
    return (
      <Typography variant="sx={{ m: 2 }}h2">"An error has occured"</Typography>
    );
  if (!questionDetails)
    return <Typography variant="h4">"Loading..."</Typography>;

  //Filtering the poc for the choosen project
  const filteredQuestions = questionDetails.data.filter((question) => {
    const filteredOnes = question.attributes.templates.data.length > 0;
    return filteredOnes;
  });

  console.log(filteredQuestions);
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
      <Typography sx={{ textAlign: "right", mr: -15 }}>
        <Typography variant="templateVariant">
          {filteredQuestions.length}
        </Typography>{" "}
        questions
      </Typography>
      {filteredQuestions.map((question, index) => {
        return (
          <Box sx={{ ml: 2 }} key={question.id}>
            <Accordion
              sx={{
                mt: 2,
                mb: 2,
                bgcolor: "#f5f5f5",
                borderRadius: "5px",
                width: "115%",
              }}
              defaultExpanded={index === 0 ? true : false}
            >
              <AccordionSummaryStyled
                expandIcon={<CustomExpandIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Stack>
                  <Typography variant="templateVariant" sx={{ mb: 0.5 }}>
                    {question.attributes.questionText}
                  </Typography>
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
                        question.attributes.question_option_type.data.attributes
                          .label
                      }
                    </Typography>
                  </Box>
                </Stack>
              </AccordionSummaryStyled>
              <Divider sx={{ mx: 2, opacity: 0.3 }} />
              <AccordionDetails>
                <RadioGroup sx={{ ml: 2 }}>
                  {question.attributes.question_options.data.map((option) => {
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
              </AccordionDetails>
            </Accordion>
          </Box>
        );
      })}
    </Box>
  );
};

export default AccordionQuestion;
