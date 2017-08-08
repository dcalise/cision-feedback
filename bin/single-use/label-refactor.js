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

    // products
    const idxProducts = {}
    const productsResult = await db.ref('products').once('value')
    const products = productsResult.val()

    Object.keys(products).forEach((key) => {
      const k = products[key]
      if (!idxProducts[k.displayName]) idxProducts[k.displayName] = key
    })

    const featuresResult = await db.ref('features').once('value')
    const features = featuresResult.val()

    Object.keys(features).forEach(async (key) => {
      const feature = features[key]
      if (feature.product && idxProducts[feature.product]) {
        try {
          console.log('updating product of feature %s with %s', key, idxProducts[feature.product])
          await db.ref(`features/${key}/product`).set(idxProducts[feature.product])
        } catch(e) {
          console.log(e);
          console.log('error, exiting')
          process.exit(1)
        }
      } 
    })

    // locations
    const idxLocations = {}
    const locationsResult = await db.ref('locations').once('value')
    const locations = locationsResult.val()

    Object.keys(locations).forEach((key) => {
      const k = locations[key]
      if (!idxLocations[k.displayName]) idxLocations[k.displayName] = key
    })

    Object.keys(features).forEach(async (key) => {
      const feature = features[key]
      if (feature.location && idxLocations[feature.location]) {
        try {
          console.log('updating location of feature %s with %s', key, idxLocations[feature.location])
          await db.ref(`features/${key}/location`).set(idxLocations[feature.location])
        } catch(e) {
          console.log(e);
          console.log('error, exiting')
          process.exit(1)
        }
      } 
    })

    // labels
    const idxLabels = {}
    const labelsResult = await db.ref('labels').once('value')
    const labels = labelsResult.val()

    Object.keys(labels).forEach((key) => {
      const k = labels[key]
      if (!idxLabels[k.displayName]) idxLabels[k.displayName] = key
    })

    Object.keys(features).forEach(async (key) => {
      const feature = features[key]

      if (feature.labels) {
        const newLabelArray = feature.labels
        let isUpdated = false
        feature.labels.forEach((label, index) => {
          if (idxLabels[label]) {
            newLabelArray[index] = idxLabels[label]
            isUpdated = true
            console.log('updating label of feature %s with %s', key, idxLabels[label])
          }
        })
        if (isUpdated) {
          try {
            console.log('updating label of feature %s', key)
            await db.ref(`features/${key}/labels`).set(newLabelArray)
          } catch(e) {
            console.log(e);
            console.log('error, exiting. check out %s', feature)
            process.exit(1)
          }
        } else {
          console.log('no match for this: %s', key);
        }
      }
    })

    console.log('done!')
  } catch (e) {
    console.error(e)
    console.log('error, exiting')
    process.exit(1)
  }
}

start()