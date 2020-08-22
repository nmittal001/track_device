var mongoObject = {
  dbo: "",
  ObjectId: require("mongodb").ObjectID,

  configure: function (dboObject) {
    this.dbo = dboObject;
  },
  getAllWithWhereCondition: function (collection, conditionJson = {}) {
    return new Promise((resolve, reject) => {
      var self = this;
      self.dbo
        .collection(collection)
        .find(conditionJson)
        .toArray(function (err, result) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log("documents found");
            resolve(result);
          }
        });
    });
  },
};

module.exports = mongoObject;
