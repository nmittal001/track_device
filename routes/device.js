const deviceModule = require("../modules/device.module");
const failJson = { success: 0, message: "There was an error!" };

module.exports = {
  configure: function (app) {
    app.get("/api/v1/devices", function (req, res) {
      try {
        deviceModule.getDevices(function (result) {
          return res.json(result);
        });
      } catch (err) {
        console.log("Error: ", err);
        return res.json(failJson);
      }
    });
    app.get("/api/v1/devices/locations", function (req, res) {
      try {
        if (!req.query.hasOwnProperty("device_id")) {
          return res.json({ success: 0, message: "device_id is required" });
        }
        if (req.query.hasOwnProperty("page_number") && req.query.page_number <= 0) {
          return res.json({ success: 0, message: "page_number should be greater than or equal to 1" });
        }
        deviceModule.getDevicesLocations(req.query, function (result) {
          return res.json(result);
        });
      } catch (err) {
        console.log("Error: ", err);
        return res.json(failJson);
      }
    });
  },
};
