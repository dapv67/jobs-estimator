const express = require("express");
const router = express.Router();

// Models
const Invoice = require("../models/Invoice.model");

//Read
// Cuando ingreses a esta ruta obtendra la funcion callback(funcion con 2 parametros que esta como 2do parametro), puedes retornar formatos json
router.get("/u/:user", (req, res) => {
  const { user } = req.params; //Este simplemente expresa la variable que utilizamos en la url de la API

  Invoice.find({ user_auth: user })
    .then((allInvoices) => res.json(allInvoices))
    .catch((err) => {
      console.log(err);
    });
});
router.get("/cat/:user/:category/", (req, res) => {
  const { user } = req.params; //Este simplemente expresa la variable que utilizamos en la url de la API
  const { category } = req.params;
  console.log(user + ", " + category);
  Invoice.find({ user_auth: user, status: category })
    .then((allInvoices) => res.json(allInvoices))
    .catch((err) => {
      console.log(err);
    });
});
//Get the qty of estimates
router.get("/counter/:user", (req, res) => {
  const { user } = req.params;

  Invoice.find({ user_auth: user })
    .count()
    .then((counter) => res.json(counter))
    .catch((err) => {
      console.log(err);
    });
});

//Read one
router.get("/:invoice_id", (req, res) => {
  //Dinamizamos el identificador del item en la URL
  const { invoice_id } = req.params; //Este simplemente expresa la variable que utilizamos en la url de la API
  Invoice.findById(invoice_id)
    .then((invoice) => res.json(invoice))
    .catch((err) => {
      console.log(err);
    });
});

//Add
router.post("/", (req, res) => {
  const data = {
    user_auth: req.body.userAuth,
    folio: req.body.folio,
    date: req.body.dateInvoice,
    due_date: req.body.dueDate,
    name_client: req.body.nameClient,
    email_client: req.body.emailClient,
    address_client: req.body.addressClient,
    job_descrip: req.body.job,
    base_rate: req.body.rate,
    discount: req.body.discount,
    calculated_discount: req.body.calculatedDiscount,
    taxes: req.body.taxes,
    calculated_taxes: req.body.calculatedTax,
    subtotal: req.body.subtotal,
    total: req.body.total,
    status: "outstanding",
    items: req.body.items,
  };

  const newInvoice = new Invoice(data);
  newInvoice
    .save()
    .then(() => {
      res.status(200).send();
      console.log("Invoice added!");
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log("Error: " + err);
    });
});

//Update
router.put("/", (req, res) => {
  let id = req.body.id;

  Invoice.findById(id)
    .then((invoice) => {
      invoice.date = req.body.dateInvoice;
      invoice.due_date = req.body.dueDate;
      invoice.job_descrip = req.body.job;
      invoice.status = req.body.status;
      invoice.base_rate = req.body.rate;
      invoice.taxes = req.body.taxes;
      invoice.calculated_taxes = req.body.calculatedTax;
      invoice.discount = req.body.discount;
      invoice.calculated_discount = req.body.calculatedDiscount;
      invoice.subtotal = req.body.subtotal;
      invoice.total = req.body.total;
      invoice.items = req.body.items;

      invoice
        .save()
        .then(() => {
          res.status(200).send();
          console.log("Invoice updated!");
        })
        .catch((err) => {
          res.status(500).send(err);
          console.log("Error: " + err);
        });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//Delete
router.delete("/", (req, res) => {
  let id = req.body.id;
  Invoice.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send();
      console.log("Invoice deleted!");
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log("Error: " + err);
    });
});

module.exports = router;
