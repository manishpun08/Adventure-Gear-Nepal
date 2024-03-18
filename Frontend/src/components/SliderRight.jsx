import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Stack } from "@mui/material";

const SliderRight = () => {
  return (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <Stack direction="row">
            <CardContent>
              <Typography variant="h6">Wearables:</Typography>
              <Typography variant="h6" color="text.secondary">
                Intelligent & Durable Design
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              width="140"
              image="https://static.wixstatic.com/media/edb397_621650ae78f14746b44a424f205a6f16~mv2.png/v1/fill/w_392,h_392,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/edb397_621650ae78f14746b44a424f205a6f16~mv2.png"
              alt="green iguana"
            />
          </Stack>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <Stack direction="row">
            <CardContent>
              <Typography variant="h6">Wearables:</Typography>
              <Typography variant="h6" color="text.secondary">
                Intelligent & Durable Design
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              width="140"
              image="https://static.wixstatic.com/media/edb397_621650ae78f14746b44a424f205a6f16~mv2.png/v1/fill/w_392,h_392,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/edb397_621650ae78f14746b44a424f205a6f16~mv2.png"
              alt="green iguana"
            />
          </Stack>
        </CardActionArea>
      </Card>
    </Stack>
  );
};
export default SliderRight;
