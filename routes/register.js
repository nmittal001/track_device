module.exports = {
  configure: function (app) {
    app.get("/test", function (req, res) {
      return res.json({
        success: 1,
        data: { message: "API's are working" },
      });
    });
  },
};
