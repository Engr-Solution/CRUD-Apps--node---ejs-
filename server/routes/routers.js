const express = require("express");
const Router = express.Router();
const api = require("../controller/controller");
const axios = require("axios");

// Routes
Router.get("/", (req, res) => {
  axios
    .get("http://localhost:3000/api/user")
    .then((response) => {
      res.render("index", { users: response.data });
    })
    .catch((err) => res.send(err));
});

Router.get("/update_user", (req, res) => {
  axios
    .get("http://localhost:3000/api/user/", { params: { id: req.query.id } })
    .then((response) => {
      res.render("update_user", { user: response.data });
    })
    .catch((err) => res.send(err));
});

Router.get("/add_user", (req, res) => {
  res.render("add_user");
});

/**
 * @Coomment
 **/

// CRUD Operations
Router.post("/api/user", api.create);
Router.get("/api/user", api.find);
Router.put("/api/user/:id", api.update);
Router.delete("/api/user/:id", api.drop);

module.exports = Router;
