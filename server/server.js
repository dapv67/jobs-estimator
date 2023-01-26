const express = require("express"); // Instanciar express
const app = express(); // Inicializar el server express
const estimatesRoutes = require("./routes/estimatesRoutes");
const clientsRoutes = require("./routes/clientsRoutes");
const itemsRoutes = require("./routes/itemsRoutes");
const invoicesRoutes = require("./routes/invoicesRoutes");
const checkoutRoute = require("./routes/checkoutRoute");
const usersRoutes = require("./routes/usersRoutes");

//Body-parser sirve para utilizar req.body.nameVariable y obtener datos de formularios de manera más sencilla
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));

// DB connection
const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1/bego";
mongoose
  .connect(url)
  .then(() => {
    console.log("Conectado a la BD");
  })
  .catch((error) => {
    console.log(error);
  });

// CORS: Los servidores estan protegidos a traves de cors, sucede este error cuando solicitas info desde otro dominio por ello lo que debes hacer es habilitar a tu server mediante cors (Lo correcto es definir c/u de los dominios a los que daras información sino lo hacemos estamos abriendo la puerta a todo mundo)
const cors = require("cors");
app.use(cors());

// Enrutado de endpoints (Routing)
app.use("/api/estimates", estimatesRoutes);
app.use("/api/invoices", invoicesRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/checkout", checkoutRoute);
app.use("/api/users", usersRoutes);

app.listen(5005, () => console.log("Estoy escuchando")); // Levantar el server
