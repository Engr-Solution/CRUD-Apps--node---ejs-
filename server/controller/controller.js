const { redirect } = require("express/lib/response");
const userDB = require("../model/DbSchema");

// Create API
const create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Form can not be empty" });
    return;
  }

  const user = new userDB({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  user
    .save(user)
    .then((data) => res.redirect('/add_user'))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some Error has occured while saving data",
      });
    });
};

// Find API
const find = (req, res) => {
  const id = req.query.id;
  if (!id) {
    userDB
      .find()
      .then((users) => {
        if (!users) {
          res.status(404).send(`Can not find any users`);
        } else {
          res.send(users);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some Error has occured while searching for data",
        });
      });
  } else {
    userDB
      .findById(id)
      .then((user) => {
        if (!user) {
          res.status(404).send(`Can not find any user with the id ${id}`);
        } else {
          res.send(user);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some Error has occured while searching for data",
        });
      });
  }
};

// Update API
const update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "User can not be empty" });
    return;
  }

  let id = req.params.id;
  userDB
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Can not update user with the the id ${id}, maybe user does not exist`
          );
      } else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some Error occured while updating user",
      });
    });
};

// Delete API
const drop = (req, res) => {
  let id = req.params.id;
  userDB
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Can not delete user with the the id ${id}, maybe user does not exist`
          );
      } 
      else res.redirect('/');
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some Error occured while deleting user",
      });
    });
};

module.exports = { create, find, update, drop };
