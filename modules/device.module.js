const commonModel = require("../models/common");
const CONSTANTS = require("../config/contants");
const failJson = { success: 0, message: "There was an error!" };

module.exports = {
  getDevices: async function (callback) {
    try {
      let result = await commonModel.getAllWithWhereCondition(CONSTANTS.COLLECTIONS.DEVICES);
      if (result) {
        callback({ success: 1, data: result });
      } else {
        console.log("Error: ", err);
        callback({ success: 0, message: "Fail to get devices" });
      }
    } catch (err) {
      console.log(err);
      callback(failJson);
    }
  },
};
