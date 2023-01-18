import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useSelector } from "react-redux";

import Context from "../context/context";
import Message from "./Message";

const Chat = ({ socket }) => {
  const { user } = useSelector((state) => state.auth);

  const chat = useContext(Context);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();

  // console.log(user);

  const handleNewMessageSubmit = async (e) => {
    e.preventDefault();

    if (newMessage.length > 0) {
      try {
        const receiverId = chat.currentChat.members.find(
          (m) => m !== user?.user?._id
        );

        socket.current.emit("sendMessage", {
          senderId: user?.user?._id,
          receiverId,
          text: newMessage,
        });

        const res = await axios.post(
          "http://localhost:4000/api/messages",
          {
            senderId: user?.user?._id,
            conversationId: chat.currentChat._id,
            text: newMessage,
          },
          { withCredentials: true }
        );

        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleNewGroupMessageSubmit = async (e) => {
    e.preventDefault();

    if (newMessage.length > 0) {
      try {
        socket.current.emit("groupMessage", {
          senderId: user?.user?._id,
          conversationId: chat.currentChat._id,
          text: newMessage,
        });

        const res = await axios.post(
          "http://localhost:4000/api/messages",
          {
            senderId: user?.user?._id,
            conversationId: chat.currentChat._id,
            text: newMessage,
          },
          { withCredentials: true }
        );

        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (
      chat.currentChat.members?.length === 2 &&
      chat.currentChat.chatwith === "single"
    ) {
      socket?.current?.on("getMessage", (data) => {
        setArrivalMessage({
          senderId: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }

    if (
      chat.currentChat.members?.length > 2 &&
      chat.currentChat.chatwith === "group"
    ) {
      socket?.current?.on("user_joined", ({ user, conversationId }) => {
        console.log(
          `${user.userId} has joined the conversation ${conversationId}`
        );
      });

      socket?.current?.on("get_groupMessage", ({ senderId, text }) => {
        setArrivalMessage({
          senderId: senderId,
          text: text,
          createdAt: Date.now(),
        });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage &&
      chat.currentChat.members?.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    const getCurrentUser = async () => {
      const receiverId = chat.currentChat.members?.find(
        (m) => m !== user?.user?._id
      );
      try {
        const res = await axios.get(
          `http://localhost:4000/api/user?userId=${receiverId}`,
          { withCredentials: true }
        );

        setCurrentChat(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getCurrentGroup = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/group/conversation?conversationId=${chat.currentChat._id}`,
          { withCredentials: true }
        );

        setCurrentChat(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (
      chat.currentChat.members?.length === 2 &&
      chat.currentChat.chatwith === "single"
    ) {
      getCurrentUser();
    }

    if (
      chat.currentChat.members?.length > 2 &&
      chat.currentChat.chatwith === "group"
    ) {
      getCurrentGroup();
    }
  }, [chat.currentChat]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/user/messages?conversationId=${chat.currentChat._id}`,
          { withCredentials: true }
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getMessages();
  }, [chat.currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // console.log(currentChat);

  return (
    <>
      <div className="w-full h-full ">
        <div className="w-full h-24 px-7 flex justify-between items-center border-b border-b-secondaryBorder">
          <div className="flex flex-col justify-center">
            <p className="text-lg text-primary font-medium">
              {currentChat?.members?.length > 2 &&
              currentChat?.chatwith === "group" ? (
                <>
                  <span>{currentChat?.chatname}</span>
                </>
              ) : (
                <>
                  <span>{currentChat?.firstname}</span>{" "}
                  <span>{currentChat?.lastname}</span>
                </>
              )}
            </p>
          </div>
          <div className="flex items-center">
            <div className="mr-3 p-[13px] border border-[#EFF1F3] cursor-pointer rounded-md">
              <span className="text-primary">
                <VisibilityOutlinedIcon />
              </span>
            </div>
            <div className="p-4 bg-buttonBackground rounded-md text-white text-[16px] font-semibold">
              <span>View Project</span>
            </div>
          </div>
        </div>
        <div
          className="w-full h-[480px]
        px-7 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200"
        >
          {messages?.map((message) => (
            <div key={message._id} ref={scrollRef}>
              <Message message={message} user={user} />
            </div>
          ))}
        </div>
        <div className="w-full h-[90px] px-7 flex items-center py-6 border-t border-t-secondaryBorder">
          <form
            className="w-full h-full flex items-center"
            onSubmit={
              currentChat?.members?.length > 2 &&
              currentChat?.chatwith === "group"
                ? handleNewGroupMessageSubmit
                : handleNewMessageSubmit
            }
          >
            <div className="w-full h-full">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full h-full outline-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <div className="-rotate-45 cursor-pointer">
                <span>
                  <AttachmentOutlinedIcon />
                </span>
              </div>
              <div className="mx-7 cursor-pointer">
                <span>
                  <FileUploadOutlinedIcon />
                </span>
              </div>
              <div className="w-[43px] h-[43px] bg-headerBackground text-white cursor-pointer">
                <button
                  type="submit"
                  className="w-full h-full flex items-center justify-center"
                >
                  <span>
                    <SendOutlinedIcon />
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
