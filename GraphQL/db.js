import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connection to MongoDB", error.message);
  });
