var mongoObject = {
  dbo: "",
  ObjectId: require("mongodb").ObjectID,

  configure: function (dboObject) {
    this.dbo = dboObject;
  },
  getAllWithWhereCondition: function (collection, conditionJson = {}, skip = 0, limit = 0) {
    return new Promise((resolve, reject) => {
      var self = this;
      self.dbo
        .collection(collection)
        .find(conditionJson)
        .skip(skip)
        .limit(limit)
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
