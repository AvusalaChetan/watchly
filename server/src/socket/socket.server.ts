import {type Server as HttpServer} from "node:http";
import {Server} from "socket.io";
import {socketAuthenticated} from "../middleware/socket.middelware.js";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
} from "../types/types.js";
import {registerRoomHandlers} from "./handlers/room.handler.js";

export default function socketServer(httpServer: HttpServer) {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents
  >(httpServer, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  io.use(socketAuthenticated);

  io.on("connection", async (socket) => {
    registerRoomHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log(`User Disconnected : ${socket.id}`);
    });
  });

  return io;
}
