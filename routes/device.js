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
        console.log(err);
        return res.json(failJson);
      }
    });
  },
};
