import { model, Schema, Types } from "mongoose";

const maintaskSchema = new Schema(
  {
    TaskName: { type: String, required: true, unique: true },
    userId: { type: Types.ObjectId, required: true, ref: "User" },
    startDate: Date,
    endDate: Date,
    deleted: Boolean,
    done: { type: Boolean, default: false },
    donePercentage: Number,
  },
  {
    timestamps: true,
  }
);

export const MainTask = model("mainTask", maintaskSchema);
