import socketIoClient from "socket.io-client";
import axios from "axios";

import store from "../store";
import {
  getNotifications,
} from "./manageNotifications";
import { showToastMessage } from "./toastNotification";

export const joinNotification = () => {
  const socket = socketIoClient("/notification", {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    forceNew: true
  });
  socket.on("connect", async () => {
    console.log(socket);

    await axios.post("/api/notification/join", { socketId: socket.id });
  });

  socket.on("newPoem", () => {
    store.dispatch(getNotifications());
    store.dispatch(
      showToastMessage("New Poem written by one of your acquaintances")
    );
  });

  socket.on("newFollower", () => {
    store.dispatch(getNotifications());
    store.dispatch(showToastMessage("A user just started to follow you"));
  });


  return;
};
