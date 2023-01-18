import React from "react";
import { format } from "timeago.js";

const Message = ({ message, user }) => {
  return (
    <div
      className={
        message?.senderId !== user?.user?._id
          ? "w-full flex justify-start my-5"
          : "w-full flex flex-row-reverse justify-start my-5"
      }
    >
      <div
        className={
          message?.senderId !== user?.user?._id
            ? "w-12 h-12 mr-3"
            : "w-12 h-12 ml-3"
        }
      >
        <img
          src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className="w-fit">
        <div
          className={
            message?.senderId !== user?.user?._id
              ? "py-3 px-5 w-fit max-w-[250px] xl:max-w-[330px] h-auto flex flex-auto text-primary bg-[#EFF1F3] rounded-br-2xl rounded-tr-2xl rounded-bl-2xl"
              : "py-3 px-5 w-fit max-w-[250px] xl:max-w-[330px] h-auto flex text-primary bg-[#EFF1F3] rounded-br-2xl rounded-tl-2xl rounded-bl-2xl"
          }
        >
          <span>{message?.text}</span>
        </div>
        <div className="text-sm font-normal text-secondary mt-2">
          <span>{format(message?.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
