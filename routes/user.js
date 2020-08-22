const userModule = require("../modules/users");
const failJson = { success: 0, message: "There was an error!" };
module.exports = {
  configure: function (app) {
    app.get("/api/test", function (req, res) {
      return res.json({
        success: 1,
        data: { message: "API's are working" },
      });
    });
    /**
     * API for login
     */
    app.get("/login", function (req, res) {
      try {
        if (!req.headers.hasOwnProperty("account")) {
          return res.json({ success: 0, message: "account is required" });
        }
        if (!req.headers.hasOwnProperty("access_token")) {
          return res.json({ success: 0, message: "access_token is required" });
        }
        userModule.userLogin(req.headers, function (result) {
          return res.json(result);
        });
      } catch (err) {
        console.log(err);
        return res.json(failJson);
      }
    });
  },
};
