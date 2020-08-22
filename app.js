const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const CONSTANTS = require("./config/contants");
const db = require("./lib/mongo");
const mongo = require("./models/common");
const registerRoute = require("./routes/register");

db.createConnection().then(
  function (dbo) {
    app.use(bodyparser.json());
    mongo.configure(dbo);
    registerRoute.configure(app);
    var server = app.listen(CONSTANTS.PORT, function () {
      console.log("Microservice listening on port " + server.address().port);
    });
  },
  function (rej) {
    console.log("Error starting APP", rej);
  }
);