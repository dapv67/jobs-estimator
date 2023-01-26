const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const estimateSchema = mongoose.Schema(
  {
    user_auth: { type: String, required: true },
    folio: { type: String, required: true },
    date: { type: String, required: true },
    name_client: { type: String, required: true },
    email_client: { type: String, required: true },
    address_client: { type: String, required: true },
    job_descrip: { type: String, required: true },
    status: { type: String, required: true },
    base_rate: { type: Number, required: true },
    taxes: { type: Number, required: true },
    calculated_taxes: { type: Number, required: true },
    discount: { type: Number, required: true },
    calculated_discount: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    items: { type: Object, required: true },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

const Estimate = mongoose.model("estimate", estimateSchema); //2 parametros; Name d ela collection & esquema de la collection
module.exports = Estimate;
