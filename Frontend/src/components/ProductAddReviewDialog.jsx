import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Rating from "@mui/material/Rating";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import $axios from "../lib/axios.instance";
import { useNavigate } from "react-router-dom";

const ProductAddReviewDialog = ({ productId, show, closeHandler }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["add-review"],
    mutationFn: async (values) => {
      return await $axios.post(`/product/review/${productId}`, values);
    },
    onSuccess: () => {
      closeHandler();
      queryClient.invalidateQueries({
        queryKey: ["get-product-details", "has-purchased"],
      });
      navigate(0);
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });

  return (
    <Dialog open={show} onClose={closeHandler} maxWidth={"xs"} fullWidth>
      <DialogTitle
        id="alert-dialog-title"
        sx={{ fontWeight: 600, fontSize: 22 }}
      >
        {"Add your review"}
      </DialogTitle>

      <DialogContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Rating
            value={rating}
            onChange={(_, newValue) => {
              setRating(newValue);
            }}
            size="large"
            precision={0.5}
          />
          <p style={{ fontSize: 12, marginTop: 4 }}>
            {rating == 0
              ? "Click to rate"
              : `${rating} star${rating > 1 ? "s" : ""}`}
          </p>
        </div>

        <div
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <TextField
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            label="Review title"
          />
          <TextField
            label="Product review"
            multiline
            rows={4}
            value={review}
            onChange={(event) => setReview(event.target.value)}
          />
        </div>

        <LoadingButton
          variant="contained"
          onClick={() => {
            mutate({ value: rating, title, body: review });
          }}
          autoFocus
          sx={{ marginTop: 2 }}
          disabled={rating == 0 || title == "" || review == ""}
          loading={isLoading}
        >
          <p>Submit</p>
        </LoadingButton>
      </DialogContent>
    </Dialog>
  );
};

export default ProductAddReviewDialog;
