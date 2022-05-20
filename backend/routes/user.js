const express =require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const router = express.Router();

/*************-Signup-********** */

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
/*************-Login-********** */

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Incorrect Email !"
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

/*************-Get Users-********** */

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
      error: err,
      message: "Profile Failed !"
    });
  });
});

/*************-Update-********** */
router.patch('/up', async (req, res, next) => {
  try {
    const id =  req.body.id;
    const updates = req.body  ;
    const options = { new: true };


    const userYP = await User.findByIdAndUpdate(id,updates,options);
    res.send(userYP);
    console.log('User updated !')
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: err,
      message: "User update failed !"
    });
  }
});


module.exports = router;
