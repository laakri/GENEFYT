const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const enumValues = require('mongoose-enumvalues');

const userSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User },



  
},{ timestamps: true }
);


const enumOptions = {};

userSchema.plugin(enumValues, enumOptions);



userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
