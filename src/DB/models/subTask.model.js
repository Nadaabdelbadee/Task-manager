import { model, Schema, Types } from "mongoose";

const subTaskSchema = new Schema(
  {
    subName: { type: String, required: true, unique: true },
    mainTaskId: { type: Types.ObjectId, required: true },
    startDate: Date,
    endDate: Date,
    done: { type: Boolean, default: false },
    deleted: Boolean,
  },
  {
    timestamps: true,
  }
);

export const SubTask = model("SubTask", subTaskSchema);
