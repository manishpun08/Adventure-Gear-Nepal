import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { useQuery } from "react-query";
import { userProfileBackup } from "../constant/general.constant";
import $axios from "../lib/axios.instance";
import { getFullName } from "../utils/general.function";
import LobbyDetail from "./LobbyDetail";
import NoRecruit from "./NoRecruit";
import Loader from "./Loader";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: "100%",
      height: "100%",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const fullName = getFullName();

const LobbyBody = () => {
  dayjs.extend(relativeTime);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-recruit-list"],
    queryFn: async () => {
      return await $axios("/recruit/get/list");
    },
  });

  const recruitList = data?.data?.recruitList;

  if (recruitList && recruitList.length < 1) {
    return <NoRecruit />;
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Stack>
        {recruitList?.map((item) => {
          return (
            <>
              <Stack
                direction="row"
                mt={2}
                mb={2}
                justifyContent="space-between"
              >
                <Typography variant="h5" fontWeight="600">
                  Trip to {item?.destination}{" "}
                  <span
                    style={{ fontSize: "24px", textTransform: "capitalize" }}
                  >
                    ({item?.adventure})
                  </span>
                </Typography>
                <Typography variant="h5" fontWeight="600" paddingRight={25}>
                  Expires {dayjs(item?.lobbyExpireAt).fromNow()}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                mb={2}
                key={item._id}
              >
                <Box
                  height={160}
                  width={160}
                  display="flex"
                  alignItems="center"
                  p={2}
                  sx={{ border: "1px solid #ddd" }}
                >
                  <Avatar {...stringAvatar(fullName)} />
                </Box>
                <Box
                  height={160}
                  width={160}
                  display="flex"
                  alignItems="center"
                  p={2}
                  sx={{ border: "1px solid #ddd" }}
                >
                  <img
                    style={{ width: "100%" }}
                    src={userProfileBackup}
                    alt=""
                  />
                </Box>
                <Box
                  height={160}
                  width={160}
                  display="flex"
                  alignItems="center"
                  p={2}
                  sx={{ border: "1px solid #ddd" }}
                >
                  <img
                    style={{ width: "100%" }}
                    src={userProfileBackup}
                    alt=""
                  />
                </Box>
                <Box
                  height={160}
                  width={160}
                  display="flex"
                  alignItems="center"
                  p={2}
                  sx={{ border: "1px solid #ddd" }}
                >
                  <img
                    style={{ width: "100%" }}
                    src={userProfileBackup}
                    alt=""
                  />
                </Box>
                <Box
                  height={160}
                  width={160}
                  display="flex"
                  alignItems="center"
                  p={2}
                  sx={{ border: "1px solid #ddd" }}
                >
                  <img
                    style={{ width: "100%" }}
                    src={userProfileBackup}
                    alt=""
                  />
                </Box>
                <Box
                  height={160}
                  width={160}
                  display="flex"
                  alignItems="center"
                  p={2}
                  sx={{ border: "1px solid #ddd" }}
                >
                  <img
                    style={{ width: "100%" }}
                    src={userProfileBackup}
                    alt=""
                  />
                </Box>
                <LobbyDetail {...item} />
                <Button variant="contained" color="warning">
                  Join
                </Button>
              </Stack>
            </>
          );
        })}
      </Stack>
    </>
  );
};

export default LobbyBody;
