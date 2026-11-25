import {useEffect, useState} from "react";
import {io, type Socket} from "socket.io-client";
import {useAppSelector} from "../../../app/store/hooks/storeHookes";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const {accessToken} = useAppSelector((s) => s.auth);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: {token: accessToken},
      extraHeaders: {
        authrization: `Bearet ${accessToken}`,
      },
    });
    socket.connect();
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, [accessToken]);

  return {socket};
};
