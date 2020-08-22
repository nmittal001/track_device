var mongoObject = {
  dbo: "",
  ObjectId: require("mongodb").ObjectID,

  configure: function (dboObject) {
    this.dbo = dboObject;
  },
};

module.exports = mongoObject;
