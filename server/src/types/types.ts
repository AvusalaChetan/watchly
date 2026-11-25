export type User = {
  userId: string;
  role: "user" | "admin";
};

export interface ClientToServerEvents {
  "room:create": (data: string) => void;
}

export interface ServerToClientEvents {}

export interface InterServerEvents {}

export interface SocketData {
  user: User;
}

 