const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
});

//Con esto nos aseguramos que no exista un usuario en BD igual al que vamos a crear
userSchema.plugin(uniqueValidator);

const User = mongoose.model("user", userSchema); //2 parametros; Name d ela collection & esquema de la collection
// const Estimate = mongoose.model("test_home", estimateSchema);

module.exports = User;
