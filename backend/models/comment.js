const mongoose = require("mongoose");
const User = require("./user");

const commentSchema = mongoose.Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: User },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: User },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
