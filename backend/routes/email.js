const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jerryclown6699@gmail.com",
    pass: "jerryclown6699jerryclown6699",
  },
});
router.post("", (req, res, next) => {
  transporter
    .sendMail({
      from: req.body.email, //
      to: "jerryclown6699@gmail.com",
      subject: req.body.name,
      html:
        "<h1>" +
        req.body.name +
        "</h1<br><h2>" +
        req.body.email +
        "</h2><br><h4>" +
        req.body.textA +
        "</h4>",
    })
    .catch(console.error);
});

module.exports = router;
