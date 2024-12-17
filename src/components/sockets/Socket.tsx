import { useEffect, useState } from "react";
import io from "socket.io-client";

export interface ISocketProps {
  children: React.ReactNode;
}

const Socket: React.FC<ISocketProps> = (props) => {
  const socket = io("http://localhost:3000", {
    auth: {
      token: localStorage.getItem("auth_token"),
    },
  });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log("Connected to server");
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  return <>{props.children}</>;
};

export default Socket;
