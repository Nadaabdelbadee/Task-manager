import mongoose from "mongoose";

async function connectDB() {
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connected successfully");
    })
    .catch((error) => {
      console.log("Failed to connect");
    });
}


export default connectDB