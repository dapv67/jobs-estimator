const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const itemSchema = mongoose.Schema(
  {
    user_auth: { type: String, required: true },
    descrip: { type: String, required: true },
    type_work: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    unit_measurement: { type: String, required: true },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

const Item = mongoose.model("item", itemSchema); //2 parametros; Name d ela collection & esquema de la collection
module.exports = Item;
