const express = require("express");
const Review = require("../models/Review.model");
const Boat = require('../models/Boat.model');
const router = express.Router();

router.get("/", (req, res, next) => {
  // get the reviews
  Review.find({})
    .then((reviews) => res.status(200).json(reviews))
    .catch((err) => res.status(500).json(err));
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  // find a especific review
  Review.findOne({ _id: id })
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(500).json(err));
});

router.post("/", (req, res, next) => {
  const { review, stars } = req.body;

  if (!req.body) {
    // error code 400 - bad request
    return res.status(400).json({ message: "All fields are required" });
  }
  Review.create({
    review,
    stars,
    user: req.user.id,
  })
  .then((review) => {
    const boatId = req.boat.id
    Boat.findOneAndUpdate({ _id: boatId }, { $push: {'reviews': review.id }}, { new: true })
    .then((updatedBoat) => {
      res.status(200).json(updatedBoat)
    })
    .catch((err) => res.status(500).json(err));
  })
    .catch((err) => res.status(500).json(err));
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  // find a review and let only the owner of it update it using req.user.id
  Review.findOneAndUpdate({ _id: id, user: req.user.id }, req.body, { new: true })
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(500).json(err));
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  // find a review and let only the owner of it delete it using req.user.id
  Review.findOneAndRemove({ _id: id, user: req.user.id })
  .then(() => {
    const boatId = req.boat.id
    Boat.findOneAndUpdate({ _id: boatId }, { $pull: {'reviews': id }}, { new: true })
    .then((updatedBoat) => {
      res.status(200).json(updatedBoat)
    })
    .catch((err) => res.status(500).json(err));
  })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;