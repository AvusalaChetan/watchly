import {Server, Socket} from "socket.io";
import requestModel from "../../models/request.model.js";
import {getRoomId} from "../../utils/getRoomId.js";
import {
  ERROR,
  ROOM_CLOSE,
  ROOM_CREATE,
  ROOM_CREATED,
  ROOM_JOIN_ACCEPTE,
  ROOM_JOIN_ACCEPTED,
  ROOM_JOIN_REJECTE,
  ROOM_JOIN_REJECTED,
  ROOM_JOIN_REQUEST,
  ROOM_LEAVE,
} from "../event.js";
import {room} from "../state/rooms.js";

export function registerRoomHandlers(io: Server, socket: Socket) {
  const {user} = socket.data;

  socket.join("user:" + user._id.toString());

  socket.on(ROOM_CREATE, () => {
    const roomId = getRoomId();

    room.set(roomId, {
      hostId: user._id.toString(),
      members: [user._id.toString()],
      playing: false,
      time: 0,
      updatedAt: Date.now(),
    });

    socket.join(roomId);
    socket.emit(ROOM_CREATED, {
      roomId,
      host: user.username,
      members: [user.username],
    });
  });

  socket.on(ROOM_JOIN_REQUEST, async (data: {roomId: string}) => {
    try {
      if (!data?.roomId) return;
      const {roomId} = data;

      const r = room.get(roomId);
      if (!r) {
        socket.emit(ERROR, {message: "room not found"});
        return;
      }

      if (r.members.includes(user._id.toString())) {
        socket.emit(ERROR, {message: "you are already in this room"});
        return;
      }

      const requestExist = await requestModel.findOne({
        roomId,
        user: user._id,
        status: "pending",
      });

      if (requestExist) {
        socket.emit(ERROR, {message: "request already exists"});
        return;
      }

      const userRequest = await requestModel.create({
        roomId,
        user: user._id,
        status: "pending",
      });

      io.to("user:" + r.hostId).emit("room:join-received", {
        userRequest: {
          _id: userRequest.id,
          roomId: userRequest.roomId,
          user: userRequest.user,
          status: userRequest.status,
          createdAt: userRequest.createdAt.toISOString(),
          updatedAt: userRequest.updatedAt.toISOString(),
        },
      });
    } catch (error) {
      console.error("room:join-request failed", error);
      socket.emit(ERROR, {message: "something went wrong"});
    }
  });

  socket.on(
    ROOM_JOIN_ACCEPTE,
    async (data: {roomId: string; requestId: string}) => {
      try {
        const {roomId, requestId} = data ?? {};

        if (!roomId || !requestId) {
          socket.emit(ERROR, {message: "roomId or requestId missing"});
          return;
        }

        const r = room.get(roomId);
        if (!r || r.hostId !== user._id.toString()) {
          socket.emit(ERROR, {message: "only the host can accept"});
          return;
        }

        const request = await requestModel.findById(requestId).populate<{
          user: {_id: string; email: string; username: string};
        }>("user", "_id username email");

        if (!request || request.roomId !== roomId) {
          socket.emit(ERROR, {message: "join request not found"});
          return;
        }
        if (request.status !== "pending") {
          socket.emit(ERROR, {message: "join request is no longer pending"});
          return;
        }

        const requesterName = request.user.username;
        const requesterId = request.user._id.toString();

        await requestModel.findByIdAndUpdate(requestId, {status: "accepted"});

        if (!r.members.includes(requesterId)) {
          r.members.push(requesterId);
        }

        io.in("user:" + requesterId).socketsJoin(roomId);

        io.to(roomId).emit(ROOM_JOIN_ACCEPTED, {
          alert: `${requesterName} is joined`,
        });
      } catch (error) {
        console.error("room:join-accept failed", error);
        socket.emit(ERROR, {message: "something went wrong"});
      }
    },
  );

  socket.on(
    ROOM_JOIN_REJECTE,
    async (data: {roomId: string; requestId: string}) => {
      try {
        const {roomId, requestId} = data ?? {};

        if (!roomId || !requestId) {
          socket.emit(ERROR, {message: "roomId or requestId missing"});
          return;
        }
        const r = room.get(roomId);
        if (!r || r.hostId !== user._id.toString()) {
          socket.emit(ERROR, {message: "only the host can accept or reject"});
          return;
        }

        const request = await requestModel.findById(requestId).populate<{
          user: {email: string; username: string; _id: string};
        }>("user", "username _id email");

        if (!request || request.roomId !== roomId) {
          socket.emit(ERROR, {message: "join request not found"});
          return;
        }
        if (request.status !== "pending") {
          socket.emit(ERROR, {message: "join request is no longer pending"});
          return;
        }

        const requesterId = request.user._id.toString();
        const requesterName = request.user.username;

        await requestModel.findByIdAndUpdate(requestId, {status: "rejected"});

        io.to("user:" + requesterId).emit(ROOM_JOIN_REJECTED, {
          alert: `${requesterName} is rejected by host`,
        });
      } catch (error) {
        console.error("room:join-rejected failed", error);
        socket.emit(ERROR, {message: "something went wrong"});
      }
    },
  );

  socket.on(ROOM_LEAVE, async (data: {roomId: string}) => {
    try {
      const {roomId} = data ?? {};
      const userId:string = user._id.toString();
      if (!roomId) {
        socket.emit(ERROR, {message: "roomId missing"});
        return;
      }

      const r = room.get(roomId);
      console.log(ROOM_LEAVE, {roomId, r, userEmail: user.email});
      if (!r) {
        socket.emit(ERROR, {message: "room not found"});
        return;
      }

      if (!r.members.includes(userId)) {
        socket.emit(ERROR, {message: "you are not in this room"});
        return;
      }

      if (r.hostId === userId) {
        io.to(roomId).emit(ROOM_CLOSE, {
          alert: "Host left the room and the room was closed",
        });

        io.in(roomId).socketsLeave(roomId);
        room.delete(roomId);
        await requestModel.deleteMany({roomId});
        return;
      }

      r.members = r.members.filter((memberId: string) => memberId !== userId);
      await requestModel.deleteOne({roomId, user: user._id});

      io.in("user:" + userId).socketsLeave(roomId);

      io.to(roomId).emit("ROOM_LEAVE", {
        alert: `${user.username} has left the room`,
      });
    } catch (error) {
      console.error("ROOM_LEAVE failed", error);
      socket.emit(ERROR, {message: "something went wrong"});
    }
  });
}
