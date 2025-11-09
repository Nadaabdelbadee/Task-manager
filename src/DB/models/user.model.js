import { model, Schema } from "mongoose";
import { Gender } from "../../enums.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "user name already exist"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "email already exist"],
    },
    password: { type: String, required: true },
    birthOfDate: Date,
    Deleted: { type: Boolean, default: false },
    gender: { type: String, enum: Object.values(Gender) },
    isConfirmed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
export const User = model("user", userSchema);
