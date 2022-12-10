import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";

const PopupDialog = ({ open, handleClose }) => {
  const router = useRouter();
  const { params = [] } = router.query;

  const handleRouting = () => {
    router.push(`/Accounts/${params[0]}`);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontSize: "20px", m: 1, fontWeight: "600" }}
        >
          {"Are you sure you want to cancel this workflow?"}
        </DialogTitle>

        <DialogActions sx={{ m: 1 }}>
          <Button
            sx={{ fontWeight: "600", fontSize: "17px" }}
            onClick={handleRouting}
          >
            Yes
          </Button>
          <Button
            sx={{ fontWeight: "600", fontSize: "17px" }}
            onClick={handleClose}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopupDialog;
