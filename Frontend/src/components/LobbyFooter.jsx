import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { useNavigate } from "react-router-dom";

const LobbyFooter = () => {
  const navigate = useNavigate();

  return (
    <Grid container borderTop="2px solid #ddd">
      <Grid item md={8} textAlign="center" mt={2}>
        <Stack direction="row" spacing={2}>
          <Box>
            <FormControl sx={{ width: "150px" }}>
              <InputLabel>SHOW ALL</InputLabel>
              <Select label="Show All">
                <MenuItem value={"camp"}>CAMP</MenuItem>
                <MenuItem value={"trek"}>TREK</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl sx={{ width: "150px" }}>
              <InputLabel>DEFAULT</InputLabel>
              <Select label="DEFAULT">
                <MenuItem value={"descending"}>DESCENDING</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </Grid>
      <Grid item md={4} mt={2}>
        <Stack direction="row" spacing={4}>
          <Box textAlign="center">
            <IconButton
              onClick={() => {
                location.reload();
              }}
              color="primary"
            >
              <RefreshIcon />
              <Typography>Refresh</Typography>
            </IconButton>
          </Box>
          <Box textAlign="center">
            <IconButton
              color="primary"
              onClick={() => {
                navigate("/recruit");
              }}
            >
              <PersonAddAlt1Icon />
              <Typography>Recruit</Typography>
            </IconButton>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default LobbyFooter;
