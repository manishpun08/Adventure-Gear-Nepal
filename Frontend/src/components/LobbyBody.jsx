import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import $axios from "../lib/axios.instance";

const LobbyBody = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-recruit-list"],
    queryFn: async () => {
      return await $axios("/recruit/get/list");
    },
  });

  const recruitList = data?.data?.recruitList;
  console.log(recruitList);

  return (
    <>
      <Box>
        <Typography
          variant="h3"
          fontWeight="700"
          textAlign="center"
          lineHeight="50vh"
        >
          Nobody is Recruiting.
        </Typography>
        <Stack>
          {recruitList?.map((item) => {
            return (
              <>
                <Typography variant="h4" fontWeight="700" mb={2}>
                  Trip to {item?.destination}{" "}
                  <span
                    style={{ fontSize: "24px", textTransform: "capitalize" }}
                  >
                    ({item?.adventure})
                  </span>
                </Typography>
                <Stack direction="row" spacing={2} mb={2} key={item._id}>
                  <Box
                    height={200}
                    width={200}
                    display="flex"
                    alignItems="center"
                    p={2}
                    sx={{ border: "1px solid #ddd" }}
                  >
                    <img width="100%" src={item?.image} alt="photo" />
                  </Box>
                  <Typography>{item?.contactNumber}</Typography>
                  <Typography>{item?.date}</Typography>
                  <Typography>{item?.requirement}</Typography>
                  <Typography>{item?.teamCount}</Typography>
                </Stack>
              </>
            );
          })}
        </Stack>
      </Box>
    </>
  );
};

export default LobbyBody;
