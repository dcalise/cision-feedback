const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const serviceAccount = require("../key/key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cision-feedback-dev.firebaseio.com"
});

const db = admin.database();

async function start() {
  try {
    console.log("start!");

    // products
    const idxFeatures = {};
    const featuresResult = await db.ref("features").once("value");
    const features = featuresResult.val();

    Object.keys(features).forEach(async key => {
      const feature = features[key];
      let archive = feature.archive;
      if (!feature.activeState && feature.archive === 1) {
        try {
          console.log("archiving %s", key);
          await db.ref(`features/${key}/activeState`).set(1);
        } catch (e) {
          console.log(e);
          console.log("error, exiting");
          process.exit(1);
        }
      } else if (!feature.activeState) {
        try {
          console.log("setting %s to 2", key);
          await db.ref(`features/${key}/activeState`).set(2);
        } catch (e) {
          console.log(e);
          console.log("error, exiting");
          process.exit(1);
        }
      }
    });

    console.log("done!");
  } catch (e) {
    console.error(e);
    console.log("error, exiting");
    process.exit(1);
  }
}

start();
