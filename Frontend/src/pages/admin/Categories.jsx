import { Add, Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import $axios from "../../lib/axios.instance";
import LoadingIndicator from "./LoadingIndicator";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";

const Categories = () => {
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ["categories-list"],
    queryFn: async () => {
      return await $axios("/product/categories").then(
        (res) => res.data.categories
      );
    },
  });
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const { mutate, isLoading: isMutating } = useMutation({
    mutationKey: ["add-category"],
    mutationFn: async (values) => {
      return await $axios.post("/product/categories", values);
    },
    onSuccess: () => {
      setShowAdd(false);
      setNewCategoryTitle("");
      queryClient.invalidateQueries({
        queryKey: ["categories-list"],
      });
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });

  const { mutate: mutateDelete } = useMutation({
    mutationKey: ["delete-category"],
    mutationFn: async (values) => {
      return await $axios.delete(`/product/categories/${values.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories-list"],
      });
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });

  const [showAdd, setShowAdd] = useState(false);

  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E8EAF0",
        borderRadius: 5,
      }}
    >
      <div
        style={{
          borderBottom: "1px solid #E8EAF0",
          padding: 16,
          display: "flex",
          gap: 16,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ color: "black", fontSize: "1.5rem" }}>
          All Categories{" "}
          <span style={{ fontSize: "1rem", color: "#666666" }}>
            ({data.length} results)
          </span>
        </p>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => setShowAdd(true)}
        >
          Add
        </Button>
      </div>

      <div
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          fontSize: 18,
          alignItems: "start",
        }}
      >
        {data.map((c) => (
          <div
            key={c._id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <p style={{ flexGrow: 1 }}>{c.title}</p>
            <div style={{ display: "flex", gap: 18 }}>
              <Button
                startIcon={<Delete />}
                size="small"
                color="error"
                onClick={() => mutateDelete({ id: c._id })}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={showAdd} onClose={() => setShowAdd(false)}>
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontWeight: 600, fontSize: 22 }}
        >
          {"Add a category"}
        </DialogTitle>

        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <TextField
              value={newCategoryTitle}
              onChange={(event) => setNewCategoryTitle(event.target.value)}
              label="New category title"
            />
          </div>

          <LoadingButton
            variant="contained"
            onClick={() => {
              mutate({ title: newCategoryTitle });
            }}
            autoFocus
            sx={{ marginTop: 2, width: "100%" }}
            disabled={newCategoryTitle.trim() == ""}
            loading={isMutating}
          >
            <p>Add</p>
          </LoadingButton>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categories;
