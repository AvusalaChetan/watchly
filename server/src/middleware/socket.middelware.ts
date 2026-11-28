import type { ExtendedError, Socket } from "socket.io";
import userModel from "../models/user.model.js";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents
} from "../types/types.js";
import { readAccessToken } from "../utils/auth.utils.js";

export const socketAuthenticated = async (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents
 
  >,
  next: (error?: ExtendedError) => void,
) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.split(" ")[1];

    const {userId, role} = readAccessToken(token);
    const user = await userModel.findById(userId);
    if (!user) return;
    socket.data.user = user

    next();
  } catch (error) {
    next(
      error instanceof Error
        ? error
        : new Error("Socket authentication failed"),
    );
  }
};
