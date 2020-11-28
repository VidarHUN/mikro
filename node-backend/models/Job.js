const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  content: String,
  expiration: Date,
});

module.exports = mongoose.model("Job", schema);