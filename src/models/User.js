import mongoose from "mongoose";
import validator from "validator"; // ✅ import validator library

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
      validate: {
        validator: validator.isEmail, // ✅ use validator library
        message: "Invalid email format",
      },
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
