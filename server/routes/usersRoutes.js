const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/User.model");

router.post("/login", async (req, res) => {
  let existingUser;
  try {
    existingUser = await User.findOne({ user: req.body.user });
    console.log(existingUser);
  } catch (err) {
    console.log(err);
    res.status(403).send("Wrong user");
    // return next(err);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    console.log(isValidPassword);
  } catch (err) {
    console.log(err);
    // return next(err);
  }

  if (!isValidPassword) {
    let err = "401. Invalid credentials, could not log you in.";
    console.log(err);
    res.status(400).send("Wrong credentials");
  } else {
    let token;
    try {
      token = jwt.sign(
        {
          userId: existingUser._id,
          user: existingUser.user,
        },
        "supersecret_token",
        { expiresIn: "1h" }
      );
    } catch (err) {
      console.log(err);
      // return next(err);
    }
    // res.json(token);
    res.status(200).json({
      message: "Logged in!",
      user: existingUser.toObject({ getters: true }),
      token: token,
    });
  }
});

//Add
router.post("/signup", async (req, res) => {
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(req.body.password, 12);
  } catch (err) {
    console.log(err);
    // return next(err)
  }
  // res.status(200).json({ pass: hashedPassword });

  const data = {
    user: req.body.user,
    password: hashedPassword,
    name_business: req.body.business,
    address_business: req.body.address,
    phone_business: req.body.phone,
  };

  const createdUser = new User(data);
  createdUser
    .save()
    .then(() => {
      // res.status(200).json(data);
      res.status(200).send();
      console.log("User added!");
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log("Error: " + err);
    });

  // res
  //   .status(200)
  //   .json({ userId: createdUser._id, user: createdUser.user, token: token });
});

router.post("/verifytoken", (req, res) => {
  const token = req.headers["authorization"];
  jwt.verify(token, "supersecret_token", (err, user) => {
    if (err) {
      res.status(403).json({ msg: "No autorizado" });
    } else {
      console.log("Good!");
      res.status(200).json({ msg: "Autorizado", user });
    }
  });
});

//Read one
router.get("/:user_id", (req, res) => {
  const { user_id } = req.params; //Este simplemente expresa la variable que utilizamos en la url de la API
  User.findById(user_id)
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
