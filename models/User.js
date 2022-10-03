const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  Meals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
    },
  ],
});

userSchema.pre("save", function (next) {
  for (let i = 0; i < this.Meals.length; i++) {
    if (this.Meals[i].LogID === -1) {
      this.Meals[i].LogID = i + 1;
    }
  }
});

module.exports = new mongoose.model("User", userSchema);
