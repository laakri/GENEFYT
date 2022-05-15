const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
/*
const resultatRoutes = require("./routes/resultat");
*/
const userRoutes = require("./routes/user");
const emailRoutes = require("./routes/email");




const app = express();



//conection to data
mongoose.connect(
    "mongodb+srv://Laaki:QDZjoJOqVMtIPDEx@cluster0.gwhy6.mongodb.net/GENEFYT?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended :false}));
  app.use("/file-folder", express.static(path.join("backend/file-folder")));


  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");

    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-requested-With, Content-Type, Accept,Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );

    next();

  });

/*
app.use("/api/resultats",resultatRoutes);
*/
app.use("/api/users", userRoutes);
app.use("/api/email", emailRoutes);


module.exports = app;
