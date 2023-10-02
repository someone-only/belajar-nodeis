const mongoose = require("mongoose")
const Schema = mongoose.Schema({
  id: String,
  nama: String,
  kelas: String,
});

const Student = mongoose.model("Student", Schema);

module.exports = { Student }

