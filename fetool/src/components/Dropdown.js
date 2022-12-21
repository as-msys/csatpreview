import React, { useState } from "react";
import { FormControl, Select, Typography, MenuItem } from "@mui/material";
import useSWR from "swr";
import apiList from "../../apiRoutes/apiNames";
import { styled } from "@mui/material/styles";

const SelectLabels = ({ handleChange, setId }) => {
  const { data: templateData, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiList[4]}`
  );
  if (error)
    return (
      <Typography variant="h2" sx={{ m: 2 }}>
        "An error has occured"
      </Typography>
    );

  if (!templateData) return <Typography variant="h4">"Loading..."</Typography>;

  return (
    <div>
      <FormControl
        sx={{
          width: "50%",
          ml: 2.5,
          mt: 1,
          bgcolor: "#f5f5f5",
          borderRadius: "5px",
        }}
      >
        <Select
          defaultValue={"defaultText"}
          onChange={handleChange}
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            pt: "16px",
            pb: "20px",
            pl: "20px",
            //For disbaling the border color
            ".MuiOutlinedInput-notchedOutline": {
              border: 0,
            },
          }}
        >
          <MenuItem
            sx={{ p: 2, fontWeight: 600, fontSize: "16px" }}
            value="defaultText"
            disabled
          >
            <em>Choose any of the below template</em>
          </MenuItem>
          {templateData.data.map((template) => {
            return (
              <MenuItem
                sx={{ p: 2, fontWeight: 600, fontSize: "16px" }}
                key={template.id}
                value={template.attributes.name}
                onClick={() => setId(template.id)}
              >
                {template.attributes.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectLabels;
