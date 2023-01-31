const express = require("express");
const router = express.Router();

// Models
const Client = require("../models/Client.model");

//Read
// Cuando ingreses a esta ruta obtendra la funcion callback(funcion con 2 parametros que esta como 2do parametro), puedes retornar formatos json
router.get("/u/:user", (req, res) => {
  const { user } = req.params;

  Client.find({ user_auth: user })
    .then((allClients) => res.json(allClients))
    .catch((err) => {
      console.log(err);
    });
});

//Read one
router.get("/:client_id", (req, res) => {
  //Dinamizamos el identificador del item en la URL
  const { client_id } = req.params; //Este simplemente expresa la variable que utilizamos en la url de la API
  Client.findById(client_id)
    .then((client) => res.json(client))
    .catch((err) => {
      console.log(err);
    });
});

//Add
router.post("/", (req, res) => {
  const data = {
    user_auth: req.body.userAuth,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address1: req.body.address1,
    address2: req.body.address2,
  };

  const newClient = new Client(data);
  newClient
    .save()
    .then(() => {
      res.status(200).send();
      console.log("Client added!");
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log("Error: " + err);
    });
});

//Update
router.put("/", (req, res) => {
  let id = req.body.id;
  // console.log(id);

  Client.findById(id)
    .then((client) => {
      client.phone = req.body.phone;
      client.address1 = req.body.address1;
      client.address2 = req.body.address2;

      client
        .save()
        .then(() => {
          res.status(200).send();
          console.log("Client updated!");
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
  Client.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send();
      console.log("Client deleted!");
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log("Error: " + err);
    });
});

module.exports = router;
