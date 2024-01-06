var admin = require("firebase-admin");
var {getStorage} = require("firebase-admin/storage");

var serviceAccount = require("../keys/anonymously-433d7-firebase-adminsdk-v91jd-12235bf9ad.json");

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "anonymously-433d7.appspot.com"
});

const storage = getStorage(app).bucket();

module.exports = {
  app,
  storage
};