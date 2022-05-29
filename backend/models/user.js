const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const enumValues = require("mongoose-enumvalues");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Wallet: { type: String, default: "0X00000000000" },
    country: { type: String, default: "None" },
    imgPath: { type: String, default: "../../assets/deafault-profile-pic.png" },
    verified: { type: String, default: "no" },
    occupation: { type: String, default: "None" },
    rate: { type: String, default: "None" },
    responsTime: { type: String, default: "None" },
    skills: { type: String, default: "None" },
    description: { type: String, default: "None" },
    roles: {
      type: [
        {
          type: String,
          enum: ["user", "admin"],
        },
      ],
      default: "user",
    },
  },
  { timestamps: true }
);

const enumOptions = {};

userSchema.plugin(enumValues, enumOptions);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
