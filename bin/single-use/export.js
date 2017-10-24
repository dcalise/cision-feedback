const fs = require('fs')
const path = require('path')
const admin = require('firebase-admin')

const serviceAccount = require("../key/key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cision-feedback-dev.firebaseio.com"
});

const db = admin.database()

async function start () {
  try {

    console.log('start!')

    const arrayForExport = []

    const featuresResult = await db.ref('features').once('value')
    const features = featuresResult.val()

    Object.keys(features).forEach(async (key) => {
      const feature = features[key]
      try {
        let featureObject = {
          subject: feature.subject,
          description: feature.description,
          status: feature.status,
          location: feature.location,
          requester: feature.requesterUID
        };
        await arrayForExport.push(featureObject)
        // await db.ref(`features/${key}/product`).set(idxProducts[feature.product])
      } catch(e) {
        console.log(e);
        console.log('error, exiting')
        process.exit(1)
      }
    })

    const locationsResult = await db.ref('locations').once('value')
    const locations = locationsResult.val()

    // get location
    arrayForExport.forEach((feature)=> {
      // console.log(feature.location)
      if (feature.location && feature.location.indexOf('-' === 0)) {
        if (locations[feature.location]) {
          feature.location = locations[feature.location].displayName
        }
        
      }
    });

    console.log(arrayForExport)

    console.log('done!')
    // process.exit(1)
  } catch (e) {
    console.error(e)
    console.log('error, exiting')
    process.exit(1)
  }
}

start()