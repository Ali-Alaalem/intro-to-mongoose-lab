const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  name: String,
  age: Number,
});
const customerSchema = mongoose.model("customerSchema", Schema);
module.exports = customerSchema;
