const mongoose = require("mongoose");

const ingredientSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
});

module.exports = new mongoose.model("Ingredient", ingredientSchema);
