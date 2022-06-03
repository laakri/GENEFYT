const express = require("express");
const Comment = require("../models/comment");
const router = express.Router();
const checkauth = require("../middleware/check-user");

/******************-Add Comment-**********/

router.post("/AddComment", checkauth, (req, res, next) => {
  const comment = new Comment({
    clientId: req.body.clientId,
    sellerId: req.body.sellerId,
    comment: req.body.comment,
  });

  comment
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Comment added succesfully",
        result: {
          ...result,
          id: result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Couldn't add Comment !",
        error: err,
      });
    });
});
/**************************************/

router.get("/GetComments/:id", (req, res, next) => {
  Comment.find({ sellerId: req.params.id })
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

/***************************************/
router.delete("/delete/:id", checkauth, (req, res, next) => {
  Comment.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: "Comment deleted !" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Problem In deleting Results !",
      });
    });
});

module.exports = router;
