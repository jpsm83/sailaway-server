const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    review: { type: String, maxlength: 5000, required: true },
    stars: { type: Number, required: true },
    boat: {
      type: Schema.Types.ObjectId,
      ref: "boat",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
