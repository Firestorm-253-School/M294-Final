import { io } from "socket.io-client";

const socket = io("http://192.168.100.40:3000", {
  auth: {
    token: localStorage.getItem("auth_token"),
  },
});

export default socket;
