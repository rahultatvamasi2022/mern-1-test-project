import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link, NavLink } from "react-router-dom";

import Context from "../context/context";

const Conversation = ({ conversation, socket, newMessage }) => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const chat = useContext(Context);
  const [conversationDetails, setConversationDetails] = useState(null);
  // const []

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userId = conversation.members.find((m) => m !== user?.user?._id);

        const res = await axios.get(
          `http://localhost:4000/api/user?userId=${userId}`,
          { withCredentials: true }
        );
        setConversationDetails(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getConversationGroup = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/group/conversation?conversationId=${conversation._id}`,
          { withCredentials: true }
        );

        setConversationDetails(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (
      conversation.members.length === 2 &&
      conversation.chatwith === "single"
    ) {
      getUserDetails();
    }

    if (conversation.members.length > 2 && conversation.chatwith === "group") {
      getConversationGroup();
    }
  }, [conversation]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <NavLink
        to={`/chat/${conversation._id}`}
        className={({ isActive }) =>
          isActive
            ? "relative w-full flex items-center bg-white  hover:cursor-pointer transition-all duration-100 ease-in rounded-tl-2xl rounded-bl-2xl pl-1 md:pl-2 lg:pl-3 xl:pl-5 pr-3 md:pr-5 lg:pr-6 xl:pr-8 my-1 first:mb-1 last:mt-1"
            : "relative w-full flex  items-center hover:cursor-pointer transition-all duration-100 ease-in hover:bg-white  hover:rounded-tl-2xl hover:rounded-bl-2xl pl-1 md:pl-2 lg:pl-3 xl:pl-5 pr-3 md:pr-5 lg:pr-6 xl:pr-8 my-1 first:mb-1 last:mt-1"
        }
        onClick={() => chat.setCurrentChat(conversation)}
      >
        <img
          src={
            conversationDetails?.profilePic ||
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
          }
          className="w-[55px] h-[55px] rounded-full my-2 object-cover"
        />

        <div className="w-full flex justify-between items-center ml-2">
          <div className="">
            {conversationDetails?.chatname ? (
              <>
                <p className="text-primary text-[15px] font-semibold">
                  <span>{conversationDetails?.chatname}</span>
                </p>
              </>
            ) : (
              <>
                <p className="text-primary text-[15px] font-semibold">
                  <span>{conversationDetails?.firstname}</span>{" "}
                  <span>{conversationDetails?.lastname}</span>
                </p>
                <p className="text-secondary text-[12px] font-medium">
                  <span>{conversationDetails?.email}</span>
                </p>
              </>
            )}
          </div>
          <div className="text-secondary text-sm font-normal">
            <span>3 hrs</span>
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default Conversation;
