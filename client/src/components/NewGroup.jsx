import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

import Context from "../context/context";
import User from "./User";
import axios from "axios";
import { useContext } from "react";

const NewGroup = ({
  allSingleConversations,
  newGroupNavbarActive,
  setConversations,
  conversations,
  setNewGroupNavbarActive,
}) => {
  const navigate = useNavigate();

  const chat = useContext(Context);
  const [newGroupForm, setNewGroupForm] = useState({
    chatname: "",
    image: "https://cdn-icons-png.flaticon.com/512/74/74577.png",
    members: [],
  });

  const handleNewGroupFormData = async (e) => {
    e.preventDefault();
    console.log(newGroupForm);
    try {
      console.log("In-Progress");
      const res = await axios.post(
        "http://localhost:4000/api/group/conversation",
        {
          chatname: newGroupForm.chatname,
          image: newGroupForm.image,
          members: newGroupForm.members,
        },
        { withCredentials: true }
      );
      console.log("Done");

      // console.log(res?.data);
      // if (res?.data) {
      setConversations([...conversations, res?.data]);
      setNewGroupNavbarActive(false);
      chat.setCurrentChat(res?.data?._id);

      navigate(`/chat/${res?.data._id}`);
      // }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }

    // console.log(newGroupForm);
  };

  useEffect(() => {}, [
    newGroupNavbarActive,
    chat.setCurrentChat,
    conversations,
  ]);

  return (
    <div className="w-full h-full">
      <form className="w-full h-full" onSubmit={handleNewGroupFormData}>
        <div className="w-full h-40 flex justify-center items-center px-4 md:px-5 lg:px-6 xl:px-8 mb-4">
          <div className="w-40 h-40 rounded-full bg-[#aebac1]">
            <div className="w-full h-full flex items-center justify-center">
              <span>
                <Groups2RoundedIcon
                  style={{ fontSize: "80px", color: "#fafbfc" }}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-10 px-4 md:px-5 lg:px-6 xl:px-8">
          <input
            type="text"
            className="w-full h-10 px-2 text-md border-b border-b-inputBorder outline-none"
            placeholder="Group name ..."
            value={newGroupForm.chatname}
            onChange={(e) =>
              setNewGroupForm({ ...newGroupForm, chatname: e.target.value })
            }
          />
        </div>
        <div className="w-full h-[300px] my-3 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200">
          {allSingleConversations.map((conversation) => (
            <User
              key={conversation._id}
              conversation={conversation}
              newGroupNavbarActive={newGroupNavbarActive}
              setNewGroupForm={setNewGroupForm}
              newGroupForm={newGroupForm}
            />
          ))}
        </div>
        {newGroupForm.chatname.length > 2 &&
          newGroupForm.members.length > 1 && (
            <div className="w-full h-12 flex items-center justify-center transition-all duration-150 ease-in-out">
              <button
                className="w-12 h-12 flex items-center justify-center bg-buttonBackground rounded-full text-white"
                type="submit"
              >
                <span>
                  <CheckRoundedIcon fontSize="large" />
                </span>
              </button>
            </div>
          )}
      </form>
    </div>
  );
};

export default NewGroup;
