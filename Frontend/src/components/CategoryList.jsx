import {
  Box,
  Button,
  Card,
  CardActions,
  Chip,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import $axios from "../lib/axios.instance";

const CategoryList = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;

  const { isLoading, data } = useQuery({
    queryKey: ["list-category"],
    queryFn: async () => {
      return await $axios.get(`/product/category-list/${id}`);
    },
  });
  const productInSameCategory = data?.data?.productInSameCategory;

  return (
    <>
      <Container sx={{ marginTop: "2rem" }}>
        <Grid sx={{ background: "", marginTop: "2rem" }}>
          <Typography variant="h5" textAlign="center" fontWeight="800">
            CATEGORIES LIST
          </Typography>
        </Grid>
        <Box
          className="slider-container"
          sx={{
            background: "",
            paddingLeft: "3rem",
            marginTop: "2rem",
            display: "flex",
            gap: "1rem",
          }}
        >
          {productInSameCategory?.map((item) => {
            return (
              <Card key={item._id} sx={{ width: 270, background: "" }}>
                <img
                  src={item.image}
                  alt="Image"
                  width="100%"
                  height="200px"
                  style={{ cursor: "pointer", background: "", padding: "1rem" }}
                />
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    padding: "0rem 1rem 0rem 1rem",
                    textAlign: "start",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {item.name}
                  <Chip label={item.brand} />
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textAlign: "justify", padding: "0rem 1rem 0rem 1rem" }}
                >
                  {item.description.slice(0, 80)}...
                </Typography>
                <CardActions>
                  <Button
                    color="success"
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      navigate(`/product-details/${item._id}`);
                    }}
                  >
                    Explore
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Box>
      </Container>
    </>
  );
};

export default CategoryList;
