import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import Context from "../context/context";
import Conversation from "./Conversation";
import Chat from "./Chat";
import axios from "axios";
import NewGroup from "./NewGroup";

const ChatBox = () => {
  const { user } = useSelector((state) => state.auth);

  // const [isActiveCreateGroup, setIsActiveCreateGroup] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [allSingleConversations, setAllSingleConversations] = useState([]);
  const [newGroupNavbarActive, setNewGroupNavbarActive] = useState(false);
  const chat = useContext(Context);
  const socket = useRef();

  const handleNewGroupMembersAdd = async () => {
    // chat.setCurrentChat(null);

    setNewGroupNavbarActive(true);
  };

  const handleNewGroupCancel = () => {
    setNewGroupNavbarActive(false);
  };

  useEffect(() => {
    const getConversations = async () => {
      setAllSingleConversations([]);
      try {
        const res = await axios.get(
          "http://localhost:4000/api/user/conversations",
          {
            withCredentials: true,
          }
        );
        setConversations(res.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    const getChatWithSingleConversationList = async () => {
      setConversations([]);
      try {
        const res = await axios.get(
          "http://localhost:4000/api/user/all/conversations",
          { withCredentials: true }
        );

        setAllSingleConversations(res.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    if (!newGroupNavbarActive) {
      getConversations();
    }

    if (newGroupNavbarActive) {
      getChatWithSingleConversationList();
    }
  }, [newGroupNavbarActive]);

  // console.log(allSingleConversations);

  useEffect(() => {
    socket.current = io("ws://localhost:4000");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user?.user?._id);
    if (
      chat.currentChat?.members?.length > 2 &&
      chat.currentChat?.chatwith === "group"
    ) {
      socket.current.emit("join_conversation", {
        senderId: user?.user?._id,
        conversationId: chat.currentChat?._id,
      });
    }
  }, [user, chat.currentChat]);

  return (
    <>
      <div className="w-full flex lg:px-[100px] xl:px-[204px] pt-[61px] pb-[76px] bg-[#fafbfc]">
        <div className="relative w-full h-[666px] flex lg:rounded-[20px] overflow-hidden">
          <nav className="relative w-[330px] min-w-[300px] xl:w-[405px] h-full  bg-navBackground z-0">
            <div className="w-full h-[52px] px-3 md:px-5 lg:px-6 xl:px-8 text-md font-normal my-7">
              <form className="w-full h-full flex items-center bg-white rounded-md overflow-hidden">
                <span className="mx-3 lg:mx-4">
                  <SearchRoundedIcon
                    fontSize="small"
                    style={{ color: "#DADADA" }}
                  />
                </span>
                <input
                  className="w-full h-full text-primary placeholder:text-[#DADADA] outline-none"
                  type="text"
                  placeholder="Search by username or email"
                />
              </form>
            </div>
            <div className="w-full h-[500px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200 pl-4">
              {conversations.map((conversation) => (
                <Conversation
                  key={conversation._id}
                  conversation={conversation}
                  socket={socket}
                  // isActiveCreateGroup={isActiveCreateGroup}
                />
              ))}
            </div>
            <div className="w-full h-[40px] flex items-center justify-center px-3 md:px-5 lg:px-6 xl:px-8 ">
              <div
                onClick={handleNewGroupMembersAdd}
                className="w-full h-full flex items-center justify-center hover:bg-white cursor-pointer transition-all duration-100 ease-in-out"
              >
                <span>Create a group</span>
              </div>
            </div>
          </nav>
          <nav
            className={
              newGroupNavbarActive
                ? "absolute w-[330px] xl:w-[405px] h-full pt-6 bg-navBackground z-10 transition-all duration-150 ease-in-out"
                : "absolute w-[330px] xl:w-[405px] h-full -left-[405px] -z-10 transition-all duration-150 ease-in-out"
            }
          >
            <div className="w-full flex flex-col px-2 md:px-3 lg:px-4 xl:px-5 ">
              <div
                className="w-10 h-10 flex items-center justify-center  hover:opacity-80 hover:bg-white rounded-full cursor-pointer transition-all duration-150 ease-in-out"
                onClick={handleNewGroupCancel}
              >
                <span>
                  <ArrowBackRoundedIcon />
                </span>
              </div>
            </div>
            {allSingleConversations && (
              <NewGroup
                allSingleConversations={allSingleConversations}
                newGroupNavbarActive={newGroupNavbarActive}
                setConversations={setConversations}
                conversation={conversations}
                setNewGroupNavbarActive={setNewGroupNavbarActive}
              />
            )}
          </nav>
          <section className="relative w-[887px] min-w-[600px] h-full bg-white">
            {chat.currentChat ? (
              <Chat socket={socket} />
            ) : (
              <div className="relative w-full h-full flex justify-center items-center overflow-hidden">
                Click on one of conversations
              </div>
            )}
            {/* {isActiveCreateGroup ? (
              <NewGroup />
            ) : (
              <div className="w-full h-full flex justify-center items-center ">
                Click on one of conversations
              </div>
            )} */}
          </section>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
