const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boatSchema = new Schema(
  {
    boatName: { type: String, maxlength: 100, required: true },
    type: { type: Selection, required: true },
    image: { type: String },
    guestMax: { type: Number, required: true },
    guestMin: { type: Number, required: true },
    size: { type: Number, required: true },
    description: { type: String, maxlength: 5000, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    review: {
      type: Schema.Types.ObjectId,
      ref: "Review",
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

const Boat = mongoose.model("Boat", boatSchema);
module.exports = Boat;
