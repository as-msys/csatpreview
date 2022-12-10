import React, { useState } from "react";
import useSWR from "swr";
import apiList from "../../apiRoutes/apiNames";
import { Typography, Card, CardContent, Button } from "@mui/material";
import { Box } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const Questions = () => {
  const [show, setShow] = useState(true);

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

  const handleClick = (event) => {
    setShow(!show);
  };

  console.log(filteredQuestions);

  return (
    <Box>
      <Typography sx={{ textAlign: "right", mr: -15 }}>
        <Typography variant="templateVariant">
          {filteredQuestions.length}
        </Typography>{" "}
        questions
      </Typography>
      {filteredQuestions.map((question) => {
        return (
          <Card
            key={question.id}
            variant="outlined"
            sx={{
              bgcolor: "#f5f5f5",
              border: "none",
              borderRadius: "3px",
              width: "50vw",
              m: 3,
            }}
          >
            <CardContent
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                <Typography variant="templateVariant">
                  {question.attributes.questionText}
                </Typography>
                <Typography variant="body1" sx={{ ml: 1.7 }}>
                  <i>
                    option type:
                    <b>
                      {
                        question.attributes.question_option_type.data.attributes
                          .label
                      }
                    </b>
                  </i>
                </Typography>

                {question.attributes.question_options.data.map((option) => {
                  return (
                    <FormControl key={option.id}>
                      <RadioGroup sx={{ ml: 1.5 }}>
                        <FormControlLabel
                          value={option.attributes.label}
                          control={<Radio />}
                          label={option.attributes.label}
                        />
                      </RadioGroup>
                    </FormControl>
                  );
                })}
              </Box>
              <Box>
                <Button
                  color="secondary"
                  varaint="text"
                  sx={{ textTransform: "none", fontSize: "15px" }}
                  onClick={(e) => handleClick(e)}
                >
                  {show ? "Show" : "Hide"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default Questions;
