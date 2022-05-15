const express =require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();


router.post("/signup", (req, res, next) =>{
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
      name: req.body.name,
      email:  req.body.email,
      password : hash
      });

    user.save()
    .then(result => {
      res.status(201).json({
        message:"user created!",
      });
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err,
        message:"This User already exited !",
      });
    });

  });

});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Incorrect phone number !"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Incorrect password !"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
         { expiresIn: '1h' }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        userName: fetchedUser.name,
        userRole:fetchedUser.roles[0],
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Authentication failed !"
      });
    });
});


router.get('/data/:id', (req,res,next)=> {

  User.find({_id: req.params.id})
  .select(['-password','-__v'])
  .then(documents => {
    res.status(200).json({
      message : 'Profile runs seccesfully !',
      users :documents
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    });
  });
});




/*
router.get('/data', (req,res,next)=> {

  User.find().select(['-password','-__v'])
  .then(documents => {
    res.status(200).json({
      message : 'Users Fetched!',
      users :documents
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message : 'Can"t fetch Users!',
      error: err
    });
  });
});

router.post("/signup/admin", (req, res, next) =>{
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
      name: req.body.name,
      email:  req.body.email,
      password : hash,
      roles :["admin"]
      });

    user.save()
    .then(result => {
      res.status(201).json({
        message:"user created!",
      });
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err,
        message:"This phone number already exited !",
      });
    });

  });

});

router.delete("/:id", (req, res, next) => {
  User.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "User deleted !" })
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({
      message: "Problem In deleting Users !"
    });
  });
});

*/

module.exports = router;
