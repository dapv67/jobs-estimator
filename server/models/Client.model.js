const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const clientSchema = mongoose.Schema(
  {
    user_auth: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: true },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

const Client = mongoose.model("client", clientSchema); //2 parametros; Name d ela collection & esquema de la collection
module.exports = Client;
