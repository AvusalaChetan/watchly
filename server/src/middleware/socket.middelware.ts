import {readAccessToken} from "../utils/auth.utils.js";
import type {ExtendedError, Socket} from "socket.io";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../types/types.js";

export const socketAuthenticated = (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  next: (error?: ExtendedError) => void,
) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.split(" ")[1];

    const {userId, role} = readAccessToken(token);
    socket.data.user = {userId, role};

    next();
  } catch (error) {
    next(
      error instanceof Error ? error : new Error("Socket authentication failed"),
    );
  }
};
