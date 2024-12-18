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
    const fetchMessages = async () => {
      const messages = await ApiGet(`chats/${userId}/0`);
      console.log(messages.response);
      setMessages(messages.response);
    };
    fetchMessages();

    const handleChatMessage = (data: any) => {
      console.log(data);
      if (data.senderId == userId) {
        setMessages((messages) => [data, ...messages]);
      }
    };

    socket.on("chat_message", handleChatMessage);

    return () => {
      socket.off("chat_message", handleChatMessage);
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
      <button onClick={() => sendMessage()} className="btn">
        Send Message
      </button>
    </>
  );
};

export default SocketTestPage;
