import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {timestamps: true},
);

requestSchema.index({createdAt: 1}, {expireAfterSeconds: 86400});
const requestModel = mongoose.model("RequestModel", requestSchema);

export default requestModel;
