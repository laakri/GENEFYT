const mongoose = require("mongoose");
const User = require("./user");


const gig = mongoose.Schema({

  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
  
  gigCategorie:{ type: String, required: true },
  gigObject: { type: String, required: true },
  gigdescription: { type: String  , required: true},
  filePath:{type:String , required: true },
  
  StandarPrice:{ type: String  , required: true},
  Standardescription:{ type: String  , required: true},
  StandarDeleveryTime:{ type: String  , required: true},  
  StandarRevisions: { type: String, required: true },
  StandarBaseArtwork:{ type: String  , required: true},
  StandarTraitAccessory:{ type: String  , required: true},
  StandarVariation: { type: String, required: true },
  StandarMetadata:{ type: String  , required: true},
  StandarGeneration:{ type: String  , required: true},
  StandarBackground:{ type: String  , required: true},

  PremiumPrice:{ type: String  , required: true},
  Premiumdescription:{ type: String  , required: true},
  PremiumDeleveryTime:{ type: String  , required: true},  
  PremiumRevisions:{ type: String  , required: true},
  PremiumBaseArtwork:{ type: String  , required: true},
  PremiumTraitAccessory:{ type: String  , required: true},
  PremiumVariation: { type: String, required: true },
  PremiumMetadata:{ type: String  , required: true},
  PremiumGeneration:{ type: String  , required: true},
  PremiumBackground:{ type: String  , required: true},
}
,{ timestamps: true }
);



module.exports = mongoose.model("Gig", gig);
