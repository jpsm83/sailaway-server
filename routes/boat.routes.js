const express = require("express");
const Boat = require("../models/Boat.model");
const router = express.Router();

router.get("/", (req, res, next) => {
  // get the to dos from a user that is loggedin using req.user.id
  Boat.find({})
    .populate("reviews")
    .then((boats) => res.status(200).json(boats))
    .catch((err) => res.status(500).json(err));
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  // find a especific to do from a user that is loggedin using req.user.id
  Boat.findOne({ _id: id })
    .populate("reviews")
    .then((boat) => res.status(200).json(boat))
    .catch((err) => res.status(500).json(err));
});

router.post("/", (req, res, next) => {
  const { boatName, type, image, guestMax, guestMin, description, size } =
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
    user: req.user.id,
  })
    .then((boat) => res.status(200).json(boat))
    .catch((err) => res.status(500).json(err));
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  Boat.findOneAndUpdate({ _id: id, user: req.user.id }, req.body, { new: true })
    .then((boat) => res.status(200).json(boat))
    .catch((err) => res.status(500).json(err));
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Boat.findOneAndRemove({ _id: id, user: req.user.id })
    .then(() => res.status(200).json({ message: `Boat deleted` }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
