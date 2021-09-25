const express = require("express");
const Review = require("../models/Review.model");
const router = express.Router();

router.get("/", (req, res, next) => {
  // get the to dos from a user that is loggedin using req.user.id
  Review.find({ boat: req.boat.id })
    .populate("Reviews")
    .then((reviews) => res.status(200).json(reviews))
    .catch((err) => res.status(500).json(err));
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  // find a especific to do from a user that is loggedin using req.user.id
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
    stars
  })
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(500).json(err));
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  Review.findOneAndUpdate({ _id: id, boat: req.boat.id, user: req.user.id}, req.body, {
    new: true,
  })
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(500).json(err));
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Review.findOneAndRemove({ _id: id, boat: req.boat.id, user: req.user.id})
    .then(() => res.status(200).json({ message: `Review deleted` }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
