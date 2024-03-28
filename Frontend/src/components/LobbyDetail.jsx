import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Typography } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LobbyDetail = ({
  date,
  requirement,
  teamCount,
  contactNumber,
  image,
  description,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" color="info" onClick={handleClickOpen}>
        Details
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          fontWeight={700}
          sx={{ textDecoration: "underline" }}
          textAlign="center"
          variant="h5"
        >
          Trip Details
        </DialogTitle>
        <DialogContent>
          <img style={{ width: "100%" }} src={image} alt="Destination Photo" />
          <DialogContentText margin="1rem 0" textAlign="justify">
            {description}
          </DialogContentText>
          <Box>
            <Typography>
              Basic needs:
              <span style={{ fontWeight: "600" }}> {requirement}</span>
            </Typography>

            <Typography>
              Needed Teammates:
              <span style={{ fontWeight: "600" }}>{teamCount}</span>
            </Typography>
            <Typography>
              Contact Number:
              <span style={{ fontWeight: "600" }}> {contactNumber}</span>
            </Typography>

            <Typography>
              Date: <span style={{ fontWeight: "600" }}> {date}</span>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="info" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default LobbyDetail;
