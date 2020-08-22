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
  getDevicesLocations: async function (query, callback) {
    try {
      let { device_id, page_number } = query;
      let result = await commonModel.getAllWithWhereCondition(
        CONSTANTS.COLLECTIONS.STATUS,
        { device: device_id },
        parseInt(page_number) - 1,
        CONSTANTS.LIMITS.DEFAULT
      );
      console.log("--->>", CONSTANTS.COLLECTIONS.STATUS, { device: query.device_id }, 10, CONSTANTS.LIMITS.DEFAULT);
      if (result) {
        callback({ success: 1, data: result });
      } else {
        console.log("Error: ", err);
        callback({ success: 0, message: "Fail to get location for device id " + id });
      }
    } catch (err) {
      console.log(err);
      callback(failJson);
    }
  },
};
