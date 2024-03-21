import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import $axios from "../lib/axios.instance";
import CustomAvatar from "./CustomAvatar";
import LogoutConfirmationDialog from "./LogoutConfirmationDialog";
import SearchBar from "./SearchBar";

// add to cart
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const userRole = localStorage.getItem("userRole");

  // get cart Item count
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-cart-item-count"],
    queryFn: async () => {
      return await $axios.get("/cart/item/count");
    },
    enabled: userRole === "buyer",
  });

  const itemCount = data?.data?.itemCount;

  const navigate = useNavigate();

  const navItems = [
    {
      id: 1,
      name: "Home",
      path: "/home",
    },
    {
      id: 2,
      name: "Product",
      path: "/product",
    },
    {
      id: 3,
      name: "About",
      path: "/about",
    },
    {
      id: 4,
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <>
      <Box className="header-top" py={1}>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography sx={{ color: "warning.main" }} variant="body1">
                Free shipping within Nepal with orders above Rs 10,000
              </Typography>
            </Grid>
            <Grid item md={6} sx={{ textAlign: "right" }}>
              <Link to="#">Become a Seller</Link>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box className="header-upper" py={2}>
        <Container maxWidth="lg">
          <Grid container>
            {/* logo */}
            <Grid item xs={12} md={2}>
              <img
                onClick={() => {
                  navigate("/home");
                }}
                style={{ width: "90px", cursor: "pointer" }}
                className="logo"
                src="/img/TreakLogo.png"
                alt="logo"
              />
            </Grid>
            {/* search bar  */}
            <Grid item xs={12} md={6}>
              <SearchBar />
              {/* menu bar starts */}
              <Box textAlign="center" pt="1.4rem">
                <Box
                  sx={{
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  {navItems.map((item) => (
                    <Button
                      key={item.id}
                      sx={{ color: "#fff" }}
                      onClick={() => {
                        navigate(item.path);
                      }}
                    >
                      {item.name}
                    </Button>
                  ))}
                </Box>
              </Box>
            </Grid>
            {/* login and avatar */}
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  p: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {/* cart  */}
                {userRole === "buyer" && (
                  <IconButton
                    onClick={() => navigate("/cart")}
                    sx={{
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    <StyledBadge badgeContent={itemCount} color="secondary">
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </IconButton>
                )}

                {/* Avatar of user  */}
                <CustomAvatar />

                {/* logout account  */}
                <LogoutConfirmationDialog />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Header;
