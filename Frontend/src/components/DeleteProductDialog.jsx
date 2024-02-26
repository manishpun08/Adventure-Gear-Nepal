import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import * as React from "react";

import { Typography } from "@mui/material";
import { useMutation } from "react-query";
import { deleteProduct } from "../lib/apis";
import { useNavigate, useParams } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteProductDialog = () => {
  const navigate = useNavigate();
  const params = useParams();
  const productId = params?.id;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { isLoading, mutate } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: async () => {
      return await deleteProduct(productId);
    },

    onSuccess: (res) => {
      navigate("/product");
    },

    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });
  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        <Typography>Delete product</Typography>
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          Are you sure, you want to delete this product?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button
            onClick={() => {
              mutate();
              handleClose;
            }}
            variant="contained"
            color="error"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteProductDialog;
