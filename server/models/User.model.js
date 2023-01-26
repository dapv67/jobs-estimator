const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
  {
    user: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    name_business: { type: String, required: true },
    address_business: { type: String, required: true },
    phone_business: { type: String, required: true },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

//Con esto nos aseguramos que no exista un usuario en BD igual al que vamos a crear
userSchema.plugin(uniqueValidator);

const User = mongoose.model("user", userSchema); //2 parametros; Name d ela collection & esquema de la collection
// const Estimate = mongoose.model("test_home", estimateSchema);

module.exports = User;
