const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const CONSTANTS = require("./config/contants");
const db = require("./lib/mongo");
const mongo = require("./models/common");
const userRoute = require("./routes/user");
const jwt = require("jsonwebtoken");
const deviceRoute = require("./routes/device");

db.createConnection().then(
  function (dbo) {
    app.use(bodyparser.json());
    mongo.configure(dbo);
    userRoute.configure(app);
    app.use(function (req, res, next) {
      var token = req.headers["jwt_token"];
      if (token) {
        jwt.verify(token, CONSTANTS.SECRET_KEY, function (err, decoded) {
          if (err) {
            return res.status(403).send({
              success: 0,
              message: "Failed to authenticate token.",
            });
          } else {
            next();
          }
        });
      } else {
        return res.status(403).send({
          success: 0,
          message: "jwt_token is require",
        });
      }
    });
    deviceRoute.configure(app);

    var server = app.listen(CONSTANTS.PORT, function () {
      console.log("Microservice listening on port " + server.address().port);
    });
  },
  function (rej) {
    console.log("Error starting APP", rej);
  }
);
