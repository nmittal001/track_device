const geolib = require("geolib");
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
      console.log("Error: ", err);
      callback(failJson);
    }
  },
  getDevicesLocations: async function (query, callback) {
    try {
      let { device_id, page_number } = query;
      let deviceResult = await commonModel.getAllWithWhereCondition(CONSTANTS.COLLECTIONS.DEVICES, { id: device_id });
      if (deviceResult && deviceResult.length === 0) {
        return callback({ success: 0, message: "Please check the device id" });
      }
      let result = await commonModel.getAllWithWhereCondition(
        CONSTANTS.COLLECTIONS.STATUS,
        { device: device_id },
        parseInt(page_number) - 1,
        CONSTANTS.LIMITS.DEFAULT
      );
      let halts = await calculateHalts(result);
      if (result) {
        callback({ success: 1, halt_count: halts, data: result });
      } else {
        console.log("Error: ", err);
        callback({ success: 0, message: "Fail to get location for device id " + id });
      }
    } catch (err) {
      console.log("Error: ", err);
      callback(failJson);
    }
  },
};

let calculateHalts = function (result) {
  return new Promise((resolve, reject) => {
    try {
      let halts = 0;
      let resultLen = result.length;
      for (let i = 1; i < resultLen; i++) {
        if (
          result[i].hasOwnProperty("time") &&
          result[i - 1].hasOwnProperty("time") &&
          isWithTime(result[i].time, result[i - 1].time, CONSTANTS.TIME.MILLI_SECOND) &&
          isPointWithinRadius(result[i].gps, result[i - 1].gps, CONSTANTS.DISTANCE.METER_RADIUS)
        ) {
          halts++;
        }
      }
      resolve(halts);
    } catch (err) {
      console.log("Error: ", err);
      reject(-1);
    }
  });
};

let isWithTime = function (t1, t2, milliSecond) {
  return new Date(t1).getTime() - new Date(t2).getTime() > milliSecond;
};

let isPointWithinRadius = function (location1, location2, meter) {
  try {
    let isInside = false;
    if (location1 && location2 && location1.length === 2 && location2.length === 2 && location1[0] != null && location2[0] != null) {
      isInside = geolib.isPointWithinRadius(location1, location2, meter);
    }
    return isInside;
  } catch (err) {
    console.log("Error: ", err);
    return false;
  }
};
