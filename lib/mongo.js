const CONSTANTS = require("../config/contants");
const mongo = require("mongodb").MongoClient;

module.exports = {
  createConnection: function () {
    return new Promise(function (resolve, reject) {
      mongo.connect(CONSTANTS.MONGO.URL, { useUnifiedTopology: true }, function (err, db) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("MongoDB Connected");
          var dbo = db.db(CONSTANTS.MONGO.DB_NAME);
          resolve(dbo);
        }
      });
    });
  },
};
