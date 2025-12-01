import { model, Schema, Types } from "mongoose";

const subTaskSchema = new Schema(
  {
    subName: { type: String, required: true },
    mainTaskId: { type: Types.ObjectId, required: true },
    startDate: {type: Date, default: Date.now },
    endDate: Date,
    done: { type: Boolean, default: false },
    deleted: Boolean,
  },
  {
    timestamps: true,
  }
);

export const SubTask = model("SubTask", subTaskSchema);
