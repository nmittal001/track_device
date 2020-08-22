const commonModel = require("../models/common");
const CONSTANTS = require("../config/contants");
const failJson = { success: 0, message: "There was an error!" };
const jwt = require("jsonwebtoken");

module.exports = {
  userLogin: async function (headers, callback) {
    try {
      let res = await commonModel.getAllWithWhereCondition(CONSTANTS.COLLECTIONS.ACCESS_TOKEN, { account: headers.account });
      if (res.length === 1) {
        dbAccount = res[0].account;
        dbPassword = res[0].accessToken;
        if (headers.access_token === dbPassword) {
          let token = await getJwtToken(dbAccount);
          if (token[0]) {
            callback({
              success: 1,
              message: "Authentication successful!",
              jwt_token: token[1],
            });
          } else {
            callback({
              success: 0,
              message: "Failed to generate authenticate token.",
            });
          }
        } else {
          callback({
            success: 0,
            message: "Incorrect access_token",
          });
        }
      } else {
        callback({
          success: 0,
          message: "Incorrect account",
        });
      }
    } catch (err) {
      console.log(err);
      callback(failJson);
    }
  },
};

/**
 * function to generate JWT Token
 * @param {string} account
 */
let getJwtToken = (account_id) => {
  return new Promise(function (resolve, reject) {
    jwt.sign(
      { account: account_id },
      CONSTANTS.SECRET_KEY,
      {
        expiresIn: "1h", // expires in 1 hours
      },
      function (err, token) {
        if (err) {
          reject([false, ""]);
        } else {
          resolve([true, token]);
        }
      }
    );
  });
};
