import mongoose from "mongoose";

const dbName = process.env.DB_NAME;
const userName = process.env.USER_NAME;
const userPassword = process.env.USER_PASSWORD;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${userName}:${userPassword}@cluster0.ilpsipk.mongodb.net/${dbName}?retryWrites=true&w=majority`
    );
    console.log("Database is connected successfully.");
  } catch (error) {
    console.log("Database is not connected.");
    console.log(error.message);
  }
};

export default connectDB;
