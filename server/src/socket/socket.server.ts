import {type Server as HttpServer} from "node:http";
import {Server} from "socket.io";
import {socketAuthenticated} from "../middleware/socket.middelware.js";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../types/types.js";

export default function socketServer(httpServer: HttpServer) {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  io.use(socketAuthenticated);

  io.on("connection", (socket) => {
    console.log(`User Connected : ${socket.id}`);

    socket.on("room:create", (data) => {
       
    });

    socket.on("disconnect", () => {
      console.log(`User Disconnected : ${socket.id}`);
    });
  });

  return io;
}
