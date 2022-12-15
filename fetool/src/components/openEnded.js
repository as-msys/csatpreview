import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const MultilineTextFields = () => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        disabled
        fullWidth
        defaultValue={"Your Message"}
        id="outlined-multiline-static"
        multiline
        rows={4}
      />
    </Box>
  );
};

export default MultilineTextFields;
