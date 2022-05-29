const express = require("express");
const Gig = require("../models/gig");
const router = express.Router();
const multer = require("multer");
const User = require("../models/gig");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/file-folder");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});
/******************-Add Gig-**********/

router.post(
  "/AddGig",
  multer({ storage: storage }).single("file"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const gig = new Gig({
      userId: req.body.userId,
      gigCategorie: req.body.gigCategorie,
      gigObject: req.body.gigObject,
      gigdescription: req.body.gigdescription,
      filePath: url + "/file-folder/" + req.file.filename,

      StandarPrice: req.body.StandarPrice,
      Standardescription: req.body.Standardescription,
      StandarDeleveryTime: req.body.StandarDeleveryTime,
      StandarRevisions: req.body.StandarRevisions,
      StandarBaseArtwork: req.body.StandarBaseArtwork,
      StandarTraitAccessory: req.body.StandarTraitAccessory,
      StandarVariation: req.body.StandarVariation,
      StandarMetadata: req.body.StandarMetadata,
      StandarGeneration: req.body.StandarGeneration,
      StandarBackground: req.body.StandarBackground,

      PremiumPrice: req.body.PremiumPrice,
      Premiumdescription: req.body.Premiumdescription,
      PremiumDeleveryTime: req.body.PremiumDeleveryTime,
      PremiumRevisions: req.body.PremiumRevisions,
      PremiumBaseArtwork: req.body.PremiumBaseArtwork,
      PremiumTraitAccessory: req.body.PremiumTraitAccessory,
      PremiumVariation: req.body.PremiumVariation,
      PremiumMetadata: req.body.PremiumMetadata,
      PremiumGeneration: req.body.PremiumGeneration,
      PremiumBackground: req.body.PremiumBackground,
    });

    gig
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Result added succesfully",
          result: {
            ...result,
            id: result._id,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Couldn't add gig !",
          error: err,
        });
      });
  }
);

/******************-Get as user-**********/
router.get("/GetGigs/:id", (req, res, next) => {
  Gig.find({ userId: req.params.id })
    .then((documents) => {
      res.status(200).json({
        message: "post runs seccesfully !",
        results: documents,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
/************************************** */
router.get("/GetGig/:gigId", (req, res, next) => {
  Gig.findOne({ _id: req.params.gigId })
    .select(["-updatedAt", "-__v"])
    .then((documents) => {
      res.status(200).json({
        result: documents,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Results fetched seccesfully !",
        message: 'Couldn"t fetch result !',
        error: err,
      });
    });
});
/******************-Get All-**********/
router.get("/GetAllGigs", (req, res, next) => {
  Gig.find()
    .select([
      "-Standardescription",
      "-StandarDeleveryTime",
      "-StandarRevisions",
      "-StandarBaseArtwork",
      "-StandarTraitAccessory",
      "-StandarPrice",
      "-StandarVariation",
      "-StandarPrice",
      "-StandarMetadata",
      "-StandarGeneration",
      "-StandarBackground",

      "-PremiumPrice",
      "-Premiumdescription",
      "-PremiumDeleveryTime",
      "-PremiumRevisions",
      "-PremiumBaseArtwork",
      "-PremiumTraitAccessory",
      "-PremiumPrice",
      "-PremiumVariation",
      "-PremiumPrice",
      "-PremiumMetadata",
      "-PremiumGeneration",
      "-PremiumBackground",
      "-createdAt",
      "-updatedAt",
      "-__v",
    ])
    .then((documents) => {
      for (let i = 0; i < documents.length; i++) {
        User.findOne({ _id: documents[i].userId }).then((doc) => {
          console.log(doc);
        });
      }
      res.status(200).json({
        result: documents,
      });
    })
    .then()
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
