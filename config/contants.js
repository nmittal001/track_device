module.exports = {
  PORT: 7001,
  COLLECTIONS: {
    DEVICES: "devices",
    STATUS: "status",
    ACCESS_TOKEN: "access_token",
  },
  MONGO: {
    URL: "mongodb+srv://backendconcoxdeveloper:V3jUV7QXqEoAtnhy@cluster0-zhjde.mongodb.net/",
    DB_NAME: "__CONCOX__",
  },
  SECRET_KEY: "SECRET_KEYs",
  LIMITS: {
    DEFAULT: 10,
  },
  TIME: { MILLI_SECOND: 900000 },
  DISTANCE: {
    METER_RADIUS: 100,
  },
};
