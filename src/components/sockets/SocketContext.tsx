import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

export const SocketContext = createContext(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io("http://192.168.100.40:3000", {
      auth: {
        token: localStorage.getItem("auth_token"),
      },
    });

    function onConnect() {
      setIsConnected(true);
      console.log("Connected to server");
      newSocket.emit("chat_message", {
        userId: 2,
        message: "Hello from the client!",
      });
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    newSocket.on("connect", onConnect);
    newSocket.on("disconnect", onDisconnect);

    setSocket(newSocket);

    return () => {
      newSocket.off("connect", onConnect);
      newSocket.off("disconnect", onDisconnect);
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
