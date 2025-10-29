import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\\S+@\\S+\\.\\S+$/, "Invalid email format"],
    },
    passwordHash: {
      type: String,
      required: [true, "Password hash is required"],
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
