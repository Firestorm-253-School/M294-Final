import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ApiGet } from "../components/api";
import socket from "../components/sockets/socket";

export interface ISocketTestPageProps {}

const SocketTestPage: React.FC<ISocketTestPageProps> = (props) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    // const fetchMessages = async () => {
    //   const messages = await ApiGet(`chats/${userId}/0`);
    //   console.log(messages.response);
    //   setMessages(messages.response);
    // };
    // fetchMessages();

    const handleChatMessage = (data: any) => {
      console.log(data);
      if (data.senderId == userId) {
        setMessages((messages) => [data, ...messages]);
      }
    };

    const handleLivefeedMessage = (data: any) => {
      console.log(data);
      setMessages((messages) => [data, ...messages]);
    };

    const handleError = (data: any) => {
      console.log(data);
    };

    const handleLivefeedInitData = (data: any) => {
      console.log(data);
    };

    socket.on("chat_message", handleChatMessage);
    socket.on("error", handleError);
    socket.on("livefeed_message", handleLivefeedMessage);
    socket.on("livefeed_init_data", handleLivefeedInitData);

    return () => {
      socket.off("chat_message", handleLivefeedMessage);
      socket.off("error", handleError);
      socket.off("livefeed_message", handleLivefeedMessage);
      socket.off("livefeed_init_data", handleLivefeedInitData);
    };
  }, []);

  const sendMessage = () => {
    console.log("Sending message");

    socket.emit("chat_message", { userId: userId, message: message });
    setMessages((messages) => [
      { senderId: localStorage.getItem("user_id"), message: message },
      ...messages,
    ]);
  };

  const sendLivefeedMessage = () => {
    console.log("Sending livefeed message");
    socket.emit("livefeed_message", { message: message });
  };

  const joinLivefeed = () => {
    console.log("Joining livefeed");
    socket.emit("join_livefeed", { livefeedId: 2 });
  };

  return (
    <>
      <h1>Chat with {userId}</h1>
      <div className="flex flex-col-reverse">
        {messages.map((message) => (
          <p>{message.message}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        className="input"
      />
      <button onClick={() => sendLivefeedMessage()} className="btn">
        Send Message
      </button>
      <button onClick={() => joinLivefeed()} className="btn">
        Join Livefeed
      </button>
    </>
  );
};

export default SocketTestPage;
