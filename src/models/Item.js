import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "Vegetable",
        "Fruit",
        "Drink",
        "Dairy",
        "Grain",
        "Spice",
        "Snack",
        "Other",
      ],
      default: "Other",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    unit: {
      type: String,
      enum: ["pcs", "kg", "g", "ml", "L", "pack", "bottle", "other"],
      default: "pcs",
    },
    location: {
      type: String,
      enum: ["Pantry", "Fridge", "Freezer"],
      default: "Pantry",
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
      required: [true, "Expiry date is required"],
    },
    notes: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    barcode: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Virtual field: check expiry status
itemSchema.virtual("isExpired").get(function () {
  return new Date() > this.expiryDate;
});

export default mongoose.model("Item", itemSchema);
