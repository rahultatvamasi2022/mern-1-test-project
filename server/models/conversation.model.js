import mongoose from "mongoose";

const ChatConversationSchema = new mongoose.Schema(
  {
    chatname: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    members: {
      type: Array,
      validate: {
        validator: function (v) {
          if (v.length < 2) {
            return false;
          }
          return true;
        },
        message: (props) =>
          `More than ${props.value.length} ${props.path} should be added to group`,
      },
    },
    chatwith: {
      type: String,
      enum: {
        values: ["single", "group"],
        message: "{VALUE} is not supported",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("ChatConversation", ChatConversationSchema);
