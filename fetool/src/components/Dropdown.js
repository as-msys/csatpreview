import * as React from "react";
import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";

const SelectLabels = ({ template, handleChange }) => {
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
          defaultValue={"Template1"}
          sx={{ fontWeight: "600", fontSize: "19px", ml: -1 }}
        >
          <option value={"Template1"}>Template1</option>
          <option value={"Template2"}>Template2</option>
          <option value={"Template3"}>Template3</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default SelectLabels;
