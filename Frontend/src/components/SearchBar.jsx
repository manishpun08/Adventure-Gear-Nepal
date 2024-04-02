import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchText } from "../store/slices/productSlice";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchText } = useSelector((state) => state.product);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <FormControl fullWidth variant="outlined">
        <OutlinedInput
          value={searchText}
          onChange={(event) => {
            if (pathname != "/product") {
              navigate("/product");
            }
            const searchText = event.target.value;
            dispatch(updateSearchText(searchText));
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          sx={{ backgroundColor: "#fff", borderRadius: "12px", height: "3rem" }}
          placeholder="Search products..."
        />
      </FormControl>
    </div>
  );
};

export default SearchBar;
