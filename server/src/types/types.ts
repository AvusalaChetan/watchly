 
export type UserRequest = {
  _id: string;
  roomId: string;
  userId: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
};

export type JoinRequestPayload = {
  userRequest: UserRequest;
};

export interface ClientToServerEvents {
  "room:create": () => void;
  "room:join-request": (data: {roomId: string}) => void;
  "room:join": (data: {roomId: string; requestId: string}) => void;
  "room:join-accepted": (data: {roomId: string; requestId: string}) => void;
  "room:join-rejected": (data: {roomId: string; requestId: string}) => void;
}

export interface ServerToClientEvents {
  "room:created": (data: {roomId: string}) => void;
  "room:leave": (data: {roomId: string}) => void;
  "room:join-request": (data: JoinRequestPayload) => void;
  "room:join-accepted": (data: {alert: string}) => void;
}

export interface InterServerEvents {}

 