const express = require("express");
const Boat = require("../models/Boat.model");
const User = require("../models/User.model");
const router = express.Router();

router.get("/", (req, res, next) => {
  // get the boats
  Boat.find({})
    .then((boats) => res.status(200).json(boats))
    .catch((err) => res.status(500).json(err));
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  // find a especific boat
  Boat.findOne({ _id: id })
    // without populate you will an array of ids, with populate you get the whole document
    .populate("reviews")
    .then((boat) => res.status(200).json(boat))
    .catch((err) => res.status(500).json(err));
});

router.post("/", (req, res, next) => {
  const { boatName, type, image, guestMax, guestMin, description, size, country, city, location } =
    req.body;

  if (!req.body) {
    // error code 400 - bad request
    return res.status(400).json({ message: "All fields are required" });
  }
  Boat.create({
    boatName,
    type,
    image,
    guestMax,
    guestMin,
    description,
    size,
    country,
    city,
    location,
    user: req.user.id,
  })
    .then((boat) => {
      const userId = req.user.id
      User.findOneAndUpdate({ _id: userId }, { $push: {'myBoats': boat.id }}, { new: true })
      .then((updatedUser) => {
        res.status(200).json(updatedUser)
      })
      .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  // find a boat and let only the owner of it update it using req.user.id
  Boat.findOneAndUpdate({ _id: id, user: req.user.id }, req.body, { new: true })
    .then((boat) => res.status(200).json(boat))
    .catch((err) => res.status(500).json(err));
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  // find a boat and let only the owner of it delete it using req.user.id
  Boat.findOneAndRemove({ _id: id, user: req.user.id })
    .then(() => {
      const userId = req.user.id
      User.findOneAndUpdate({ _id: userId }, { $pull: {'myBoats': id }}, { new: true })
      .then((updatedUser) => {
        res.status(200).json(updatedUser)
      })
      .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;