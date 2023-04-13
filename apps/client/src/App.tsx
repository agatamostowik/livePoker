import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const socket = io("ws://localhost:3001/", {
  autoConnect: false,
});

export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </>
  );
}

export const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const onConnect = () => {
    setIsConnected(true);
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  const onMessage = () => {
    console.log("ping!");
  };

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
    };
  }, []);

  const handleClick = () => {
    console.log("ping!");
    socket.send({
      type: "hello from client",
      content: [3, "4"],
    });
  };

  return (
    <div>
      <button onClick={handleClick}>send!</button>
      <div>isConnected: {isConnected.toString()}</div>
      <ConnectionManager />
    </div>
  );
};
