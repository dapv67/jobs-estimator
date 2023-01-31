const express = require("express");
const router = express.Router();

// Models
const Estimate = require("../models/Estimate.model");

//Read
// Cuando ingreses a esta ruta obtendra la funcion callback(funcion con 2 parametros que esta como 2do parametro), puedes retornar formatos json
router.get("/u/:user", (req, res) => {
  const { user } = req.params; //Este simplemente expresa la variable que utilizamos en la url de la API
  Estimate.find({ user_auth: user })
    .then((allEstimates) => res.json(allEstimates))
    .catch((err) => {
      console.log(err);
    });
});
router.get("/cat/:user/:category/", (req, res) => {
  const { user } = req.params; //Este simplemente expresa la variable que utilizamos en la url de la API
  const { category } = req.params;
  console.log(user + ", " + category);
  Estimate.find({ user_auth: user, status: category })
    .then((allEstimates) => res.json(allEstimates))
    .catch((err) => {
      console.log(err);
    });
});
//Get the qty of estimates
router.get("/counter/:user", (req, res) => {
  const { user } = req.params; //Este simplemente expresa la variable que utilizamos en la url de la API

  Estimate.find({ user_auth: user })
    .count()
    .then((counter) => res.json(counter))
    .catch((err) => {
      console.log(err);
    });
});

//Read one
router.get("/:estimate_id", (req, res) => {
  //Dinamizamos el identificador del item en la URL
  const { estimate_id } = req.params; //Este simplemente expresa la variable que utilizamos en la url de la API
  Estimate.findById(estimate_id)
    .then((estimate) => res.json(estimate))
    .catch((err) => {
      console.log(err);
    });
});

//Add
router.post("/", (req, res) => {
  const data = {
    user_auth: req.body.userAuth,
    folio: req.body.folio,
    date: req.body.dateEstimate,
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
    status: "open",
    items: req.body.items,
  };

  const newEstimate = new Estimate(data);
  newEstimate
    .save()
    .then(() => {
      res.status(200).send();
      console.log("Estimate added!");
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log("Error: " + err);
    });
});

//Update
router.put("/", (req, res) => {
  let id = req.body.id;

  Estimate.findById(id)
    .then((estimate) => {
      estimate.date = req.body.dateEstimate;
      estimate.job_descrip = req.body.job;
      estimate.status = req.body.status;
      estimate.base_rate = req.body.rate;
      estimate.taxes = req.body.taxes;
      estimate.calculated_taxes = req.body.calculatedTax;
      estimate.discount = req.body.discount;
      estimate.calculated_discount = req.body.calculatedDiscount;
      estimate.subtotal = req.body.subtotal;
      estimate.total = req.body.total;
      estimate.items = req.body.items;

      estimate
        .save()
        .then(() => {
          res.status(200).send();
          console.log("Estimate updated!");
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
  Estimate.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send();
      console.log("Estimate deleted!");
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log("Error: " + err);
    });
});

module.exports = router;
