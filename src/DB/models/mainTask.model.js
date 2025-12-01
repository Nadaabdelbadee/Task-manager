import { model, Schema, Types } from "mongoose";

const maintaskSchema = new Schema(
  {
    TaskName: { type: String, required: true, unique: true },
    userId: { type: Types.ObjectId, required: true, ref: "User" },
    startDate: { type: Date, default: Date.now },
    endDate: Date,
    deleted: Boolean,
    donePercentage: Number,
    subTasks: [{ type: Types.ObjectId, ref: "SubTask" }],
  },
  {
    timestamps: true,
  }
);

export const MainTask = model("mainTask", maintaskSchema);
