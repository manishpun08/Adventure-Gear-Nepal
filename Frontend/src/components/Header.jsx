import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Container,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CustomAvatar from "./CustomAvatar";
import LogoutConfirmationDialog from "./LogoutConfirmationDialog";
import DialpadIcon from "@mui/icons-material/Dialpad";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  color: "black",
  borderRadius: theme.shape.borderRadius,
  background: "white",
  "&:hover": {
    backgroundColor: "#DDD",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  color: "black",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Header = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <Grid container sx={{ alignItems: "center" }}>
            {/* logo */}
            <Grid item xs={12} md={2}>
              <img className="logo" src="../assets/TreakLogo.png" alt="logo" />
            </Grid>
            <Grid item xs={12} md={5}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search Here…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <br />
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  p: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Link to="#">
                  <Stack direction="row" spacing={0.8}>
                    <FavoriteIcon />
                    <Typography>WishList</Typography>
                  </Stack>
                </Link>

                <Link to="#">
                  <Stack direction="row" spacing={0.8}>
                    <ShoppingCartIcon />
                    <Typography>Cart</Typography>
                  </Stack>
                </Link>

                <Link to="login">
                  <Stack direction="row" spacing={0.8}>
                    <AccountCircleIcon />
                    <Typography>Log In</Typography>
                  </Stack>
                </Link>
                {/* Avatar of user  */}
                <CustomAvatar />
                {/* logout account  */}
                <LogoutConfirmationDialog />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* menu bar starts */}
      <Box className="menu" py={2}>
        <Box sx={{ display: "flex", gap: "1rem" }} xs={12} md={12}>
          <Container maxWidth="lg">
            <Stack direction="row" spacing={10}>
              {/* dropdown menu */}
              <Button
                sx={{ color: "white", gap: "10px" }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                startIcon={<DialpadIcon />}
                endIcon={<ArrowDropDownIcon />}
              >
                Shop categories
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Men</MenuItem>
                <MenuItem onClick={handleClose}>Women</MenuItem>
                <MenuItem onClick={handleClose}>Brands</MenuItem>
                <MenuItem onClick={handleClose}>Activity</MenuItem>
                <MenuItem onClick={handleClose}>Category</MenuItem>
                <MenuItem onClick={handleClose}>New Arrivals</MenuItem>
                <MenuItem onClick={handleClose}>SALE</MenuItem>
                <MenuItem onClick={handleClose}>Used Gear</MenuItem>
              </Menu>

              {/* main menu */}
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
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
            </Stack>
          </Container>
        </Box>
        {/* menu bar starts */}
      </Box>
    </>
  );
};

export default Header;
