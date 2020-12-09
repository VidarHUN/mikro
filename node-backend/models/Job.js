const mongoose = require("mongoose");

const schema = mongoose.Schema({
  user: String,
  content: String,
  expiration: String,
});

module.exports = mongoose.model("Job", schema);