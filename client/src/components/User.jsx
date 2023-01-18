import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const User = ({
  conversation,
  newGroupNavbarActive,
  setNewGroupForm,
  newGroupForm,
}) => {
  // const navigate = useNavigate();
  const { user: profile } = useSelector((state) => state.auth);

  const [existingUserInConversation, setExistingUserInConversation] =
    useState(null);

  const handleMembersAddOrRemoveInGroup = (userId) => {
    // console.log(userId);
    // console.log(newGroupForm.members);

    // console.log(object);
    if (newGroupForm.members.includes(userId)) {
      const members = newGroupForm.members.filter(
        (member) => member !== userId
      );
      setNewGroupForm({
        ...newGroupForm,
        members: members,
      });
    } else {
      const members = newGroupForm.members.push(userId);

      setNewGroupForm({ ...newGroupForm, members: newGroupForm.members });
    }

    console.log(newGroupForm);
  };

  useEffect(() => {
    const getExistingUserConversation = async () => {
      const existingConversationUser = conversation.members.find(
        (user) => user !== profile?.user?._id
      );
      try {
        const res = await axios.get(
          `http://localhost:4000/api/user?userId=${existingConversationUser}`,
          { withCredentials: true }
        );
        setExistingUserInConversation(res.data);
        // console.log(existingUserInConversation);
        // console.log(res);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    if (newGroupNavbarActive) {
      getExistingUserConversation();
    }

    if (!newGroupNavbarActive) {
      setNewGroupForm({
        chatname: "",
        image: "",
        members: [],
      });
    }
  }, [conversation._id, newGroupNavbarActive]);

  return (
    <div
      className="w-full flex items-center text-[#000000] py-2 px-4 md:px-5 lg:px-6 xl:px-8 hover:cursor-pointer hover:bg-[#5A5968] hover:bg-opacity-10"
      onClick={() =>
        handleMembersAddOrRemoveInGroup(existingUserInConversation?._id)
      }
    >
      <img
        src={existingUserInConversation?.profilePic}
        alt={`user id-${existingUserInConversation?._id}`}
        className="w-[55px] h-[55px] mr-4 rounded-full"
      />
      <div className="w-full flex items-center ">
        <div className="w-full ">
          <p className="text-primary text-[16px]">
            <span>{existingUserInConversation?.firstname} </span>
            <span>{existingUserInConversation?.lastname}</span>
          </p>
        </div>
      </div>
      {newGroupForm.members.includes(existingUserInConversation?._id) && (
        <div className="">
          <CheckRoundedIcon />
        </div>
      )}
    </div>
  );
};

export default User;
