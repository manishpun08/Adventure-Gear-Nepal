import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  CssBaseline,
  Drawer,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import $axios from "../lib/axios.instance";
import CustomAvatar from "./CustomAvatar";
import SearchBar from "./SearchBar";
import React from "react";

const drawerWidth = 240;

// add to cart
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = (props) => {
  // user role from local storage.
  const userRole = localStorage.getItem("userRole");

  const { paymentSuccessStatus } = useSelector((state) => state.payment);

  // get cart Item count
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-cart-item-count", paymentSuccessStatus],
    queryFn: async () => {
      return await $axios.get("/cart/item/count");
    },
    enabled: userRole === "buyer",
  });
  // cart item count
  const itemCount = data?.data?.itemCount;
  // navigating
  const navigate = useNavigate();

  // navlinks
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
    {
      id: 5,
      name: "Lobby",
      path: "/lobby",
    },
  ];

  // drawer
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      bgcolor="#131921"
      sx={{ textAlign: "center" }}
    >
      <img
        onClick={() => {
          navigate("/home");
        }}
        style={{ width: "90px", cursor: "pointer" }}
        className="logo"
        src="/img/TreakLogo.png"
        alt="logo"
      />
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center", color: "#fff" }}
              onClick={() => {
                navigate(item.path);
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
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
              <Toolbar sx={{ color: "#fff" }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Box textAlign="center" pt="0.8rem">
                  <Box
                    sx={{
                      display: { xs: "none", sm: "block" },
                      "& button": {
                        color: "#fff",
                        transition: "color 0.3s", // Smooth transition effect
                        "&:hover": {
                          color: "#ffca28", // Change color on hover
                        },
                      },
                    }}
                  >
                    {navItems.map((item) => (
                      <Button
                        key={item.id}
                        onClick={() => {
                          navigate(item.path);
                        }}
                      >
                        {item.name}
                      </Button>
                    ))}

                    {userRole === "seller" && (
                      <Button onClick={() => navigate("/orders")}>
                        Orders
                      </Button>
                    )}
                  </Box>
                </Box>
              </Toolbar>

              <nav>
                <Drawer
                  container={container}
                  variant="temporary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                  sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                      boxSizing: "border-box",
                      width: drawerWidth,
                    },
                  }}
                >
                  {drawer}
                </Drawer>
              </nav>
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
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Header;
