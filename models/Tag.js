const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
});

module.exports = new mongoose.model("Tag", tagSchema);
