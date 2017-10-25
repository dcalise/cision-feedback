const fs = require('fs')
const path = require('path')
const admin = require('firebase-admin')
const json2csv = require('json2csv');
const fields = ['subject','description','date','status','location','requester'];

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
    arrayForExport.forEach((feature, i)=> {
      // console.log(feature.location)
      if (feature.location && feature.location.indexOf('-' === 0)) {
        if (locations[feature.location]) {
          arrayForExport[i].location = locations[feature.location].displayName
        }
        
      }
    });

    const usersResult = await db.ref('users').once('value')
    const users = usersResult.val()

    // get user email
    arrayForExport.forEach((feature, i)=> {
      // console.log(feature.location)
      if (feature.requester) {
        if (users[feature.requester]) {
          arrayForExport[i].requester = users[feature.requester].email
        }
        
      }
    });

    // write to file
    try {
      const result = json2csv({ data: arrayForExport, fields: fields })
      fs.writeFile(
        
        'bin/exports/export.csv',
        result,
        (err) => {
          if (err) {
              console.error(err)
          }
        }
      )
    } catch (err) {
      console.error(err);
    }


    console.log('done!')
    // process.exit(1)
  } catch (e) {
    console.error(e)
    console.log('error, exiting')
    process.exit(1)
  }
}

start()