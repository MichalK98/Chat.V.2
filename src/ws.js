import io from "socket.io-client";

const socket = io("http://localhost:9009");

export default socket;