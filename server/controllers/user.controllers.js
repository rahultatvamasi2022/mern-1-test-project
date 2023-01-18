import User from "../models/user.model.js";

export const allUsers = async (req, res, next) => {
  try {
    // const userName = req.query.fullname;
    // const searchString = new RegExp(userName, "ig");

    // const users = await User.aggregate([
    //   {
    //     $project: {
    //       fullname: { $concat: ["$firstname", " ", "$lastname"] },
    //       firstname: 1,
    //       lastname: 1,
    //       email: 1,
    //       profilePic: 1,
    //       createdAt: 1,
    //     },
    //   },
    //   { $match: { fullname: searchString } },
    // ]);

    const users = await User.find({}, { updatedAt: 0, __v: 0 });

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const userDoc = await User.findById(req.user);
    if (!userDoc) {
      return res
        .status(404)
        .send({ success: false, message: `User does not found` });
    }
    const { updatedAt, __v, ...user } = userDoc._doc;

    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const getUserDetails = async (req, res) => {
  const userId = req.query.userId;
  const email = req.query.email;
  try {
    const userDoc = userId
      ? await User.findById(userId)
      : await User.findOne({ email: email });

    if (!userDoc) {
      return res.status(404).send({
        message: "Not found",
      });
    }

    const { updatedAt, role, __v, ...user } = userDoc._doc;

    res.status(200).send(user);
  } catch (error) {}
};
