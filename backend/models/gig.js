const mongoose = require("mongoose");
const User = require("./user");


const gig = mongoose.Schema({

  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
  
  gigCategorie:{ type: String, required: true },
  gigObject: { type: String, required: true },
  gigImgPath:{type:String , required: true },
  gigdescription: { type: String  , required: true},
  
  StandarPrice:{ type: String  , required: true},
  Standardescription:{ type: String  , required: true},
  StandarDeleveryTime:{ type: String  , required: true},  
  StandarRevisions:{ type: String  , required: true},

  PremiumPrice:{ type: String  , required: true},
  Premiumdescription:{ type: String  , required: true},
  PremiumDeleveryTime:{ type: String  , required: true},  
  PremiumRevisions:{ type: String  , required: true},

}
,{ timestamps: true }
);



module.exports = mongoose.model("Gig", gig);
