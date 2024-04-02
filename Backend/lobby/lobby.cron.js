import dayjs from "dayjs";
import Lobby from "./lobby.model.js";

export const deleteLobby = async () => {
  const date = dayjs().startOf("day").add(10, "min");
  await Lobby.deleteMany({ lobbyExpireAt: { $lt: date } });
  console.log("Deleting expired");
};
