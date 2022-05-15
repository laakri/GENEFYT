const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const enumValues = require('mongoose-enumvalues');

const userSchema = mongoose.Schema({
  name:{ type: String, required: true },
  email: { type: String, required: true , unique: true },
  password: { type: String, required: true },
  Wallet:{ type: String},
  imgPath: { type: String },
  verified: { type: String,default: 'no' }, 
  rate: { type: String },
  responsTime: { type: String },
  languages: { type: String },
  skills: {type: String},
  description: { type: String },
  roles: {
    type: [{
        type: String,
        enum: ['user', 'admin']
    }],
    default: 'user'
},
},{ timestamps: true }
);


const enumOptions = {};

userSchema.plugin(enumValues, enumOptions);



userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
