import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const LogoutConfirmationDialog = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        endIcon={<LogoutIcon />}
        onClick={handleClickOpen}
        sx={{ color: "#fff" }}
      >
        Log out
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to logout?"}
        </DialogTitle>

        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleClose();
            }}
          >
            <Typography>No</Typography>
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleClose();
              localStorage.clear();
              navigate("/login");
            }}
            autoFocus
          >
            <Typography>Yes</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default LogoutConfirmationDialog;
