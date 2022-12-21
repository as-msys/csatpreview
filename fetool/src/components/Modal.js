import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 473,
  minheight: 472,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ModalBox = ({
  openModal,
  handleClose,
  employeeOfTheProject,
  countofTeamMembers,
  headerData,
}) => {
  return (
    <div>
      <Modal open={openModal}>
        <Box sx={style}>
          <Typography
            variant="h6"
            sx={{ ml: -3, mt: -1.5, px: 2, pb: 3, fontWeight: 700 }}
          >
            {headerData}({countofTeamMembers})
          </Typography>
          {employeeOfTheProject.map((employee) => {
            return (
              <Box sx={{ ml: 3, mr: 2 }} key={employee.id}>
                <Typography variant="body2">
                  {employee.attributes.name}
                </Typography>

                <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                  {employee.attributes.employee_code}
                  {employee.attributes.responseDeadlineDate}
                </Typography>
                <Divider sx={{ mb: 1, opacity: 0.7 }} />
              </Box>
            );
          })}
          <Button
            variant="text"
            color="primary"
            onClick={handleClose}
            sx={{
              position: "fixed",
              bottom: "7px",
              right: "10px",
              fontWeight: 700,
              fontSize: "15px",
              mt: 3,
            }}
          >
            OK
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalBox;
