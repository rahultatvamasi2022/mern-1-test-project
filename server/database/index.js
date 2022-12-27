import mongoose from "mongoose";

export default async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((data) => {
        console.log(`Connected with server => ${data.connection.host}`);
      });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
