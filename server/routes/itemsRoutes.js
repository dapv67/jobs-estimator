const express = require("express");
const router = express.Router();

// Models
const Item = require("../models/Item.model");

//Read
router.get("/u/:user", (req, res) => {
  const { user } = req.params;
  Item.find({ user_auth: user })
    .then((allItems) => res.json(allItems))
    .catch((err) => {
      console.log(err);
    });
});
router.get("/cat/:user/:category/", (req, res) => {
  const { user } = req.params; //Este simplemente expresa la variable que utilizamos en la url de la API
  const { category } = req.params;
  console.log(user + ", " + category);
  Item.find({ user_auth: user, type_work: category })
    .then((allItems) => res.json(allItems))
    .catch((err) => {
      console.log(err);
    });
});
//Read one
router.get("/:item_id", (req, res) => {
  const { item_id } = req.params; //Este simplemente expresa la variable que utilizamos en la url de la API
  Item.findById(item_id)
    .then((item) => res.json(item))
    .catch((err) => {
      console.log(err);
    });
});

//Add
router.post("/", (req, res) => {
  const data = {
    user_auth: req.body.userAuth,
    descrip: req.body.descrip,
    type_work: req.body.type_work,
    price: req.body.price,
    quantity: 0,
    unit_measurement: req.body.unit_measurement,
  };

  const newItem = new Item(data);
  newItem
    .save()
    .then(() => {
      res.status(200).send();
      console.log("Item added!");
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log("Error: " + err);
    });
});

//Update
router.put("/", (req, res) => {
  let id = req.body.id;

  Item.findById(id)
    .then((item) => {
      item.price = req.body.price;
      item.quantity = 0;
      item.unit_measurement = req.body.unit_measurement;

      item
        .save()
        .then(() => {
          res.status(200).send();
          console.log("Item updated!");
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
  Item.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send();
      console.log("Item deleted!");
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log("Error: " + err);
    });
});

module.exports = router;
