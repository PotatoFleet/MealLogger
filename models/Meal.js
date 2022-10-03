const mongoose = require("mongoose");

const mealSchema = mongoose.Schema({
  LogID: {
    type: Number,
    default: -1,
  },
  Timestamp: {
    type: Date,
    required: true,
  },
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  Ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
    },
  ],
});

module.exports = new mongoose.model("Meal", mealSchema);
