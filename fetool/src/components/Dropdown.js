import * as React from "react";
import { FormControl, NativeSelect, Typography } from "@mui/material";
import useSWR from "swr";
import apiList from "../../apiRoutes/apiNames";

const SelectLabels = ({ handleChange }) => {
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
          m: 2,
          p: 3,
          width: "50%",
          minWidth: 120,
          borderRadius: "5px",
          bgcolor: "#f5f5f5",
        }}
      >
        <NativeSelect
          fullWidth
          disableUnderline
          onClick={handleChange}
          defaultValue={"defaultText"}
          sx={{ fontWeight: "600", fontSize: "19px", ml: -1 }}
        >
          <option value="defaultText" disabled>
            Choose any of the below template
          </option>
          {templateData.data.map((template) => {
            return (
              <option key={template.id} value={template.attributes.name}>
                {template.attributes.name}
              </option>
            );
          })}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default SelectLabels;
