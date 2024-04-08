import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { userProfileBackup } from "../constant/general.constant";
import $axios from "../lib/axios.instance";
import { getFullName } from "../utils/general.function";
import LobbyDetail from "./LobbyDetail";
import NoRecruit from "./NoRecruit";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";

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
  const [joined, setJoined] = useState(false);

  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  dayjs.extend(relativeTime);

  // for getting all the lobby list
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-recruit-list"],
    queryFn: async () => {
      return await $axios("/recruit/get/list");
    },
  });

  // for adding user to the slot
  const {
    isLoading: addUserLoading,
    isError: addUserError,
    mutate,
  } = useMutation({
    mutationKey: ["add-user-to-lobby"],
    mutationFn: async (_id) => {
      return await $axios.post(`/lobby/addUser/${_id}`);
    },
    onSuccess: (response) => {
      dispatch(openSuccessSnackbar(response?.data?.message));

      queryClient.invalidateQueries("get-recruit-list");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  const {
    isLoading: removeUserLoading,
    isError: removeUserError,
    mutate: removeUser,
  } = useMutation({
    mutationKey: ["leave-user-from-lobby"],
    mutationFn: async (_id) => {
      return await $axios.post(`/lobby/removeUser/${_id}`);
    },
    onSuccess: (response) => {
      dispatch(openSuccessSnackbar(response?.data?.message));

      queryClient.invalidateQueries("get-recruit-list");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  const recruitList = data?.data?.recruitList;

  if (recruitList && recruitList.length < 1) {
    return <NoRecruit />;
  }

  if (isLoading || addUserLoading || removeUserLoading) {
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
                justifyContent={{ md: "space-between" }}
              >
                <Typography variant="h5" fontWeight="600">
                  Trip to {item?.destination}{" "}
                  <span
                    style={{ fontSize: "24px", textTransform: "capitalize" }}
                  >
                    ({item?.adventure})
                  </span>
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  paddingRight={{ md: 25 }}
                >
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
                {item?.userDetail?.map((user) => {
                  return (
                    <Box
                      key={user._id}
                      height={{ md: 160, xs: 100 }}
                      width={{ md: 160, xs: 100 }}
                      display="flex"
                      alignItems="center"
                      p={2}
                      sx={{ border: "1px solid #ddd" }}
                    >
                      <Avatar
                        {...stringAvatar(`${user.firstName} ${user.lastName}`)}
                      />
                    </Box>
                  );
                })}

                {Array(item.remainingSpot)
                  .fill()
                  .map((item, index) => {
                    return (
                      <Box
                        key={index}
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
                    );
                  })}

                <LobbyDetail {...item} />
                {!joined && (
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      mutate(item._id);
                      setJoined(true);
                    }}
                  >
                    Join
                  </Button>
                )}
                {joined && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      removeUser(item._id);
                      setJoined(false);
                    }}
                  >
                    Leave
                  </Button>
                )}
              </Stack>
            </>
          );
        })}
      </Stack>
    </>
  );
};

export default LobbyBody;
