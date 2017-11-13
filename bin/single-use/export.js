const fs = require('fs')
const path = require('path')
const admin = require('firebase-admin')
const json2csv = require('json2csv');
const fields = ['status','labels','subject','description','location','date','requester','totalValue','accountName','accountId','accountValue','accountSalesForceUrl','accountCountry','accountStatus','accountPrevProducts','accountNotes'];

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
      const dateFormatted = `${new Date(feature.dateCreated).getMonth()}/${new Date(feature.dateCreated).getDate()}/${new Date(feature.dateCreated).getFullYear()}`
      
      try {
        let featureObject = {
          subject: feature.subject,
          description: feature.description,
          date: dateFormatted,
          status: feature.status,
          location: feature.location,
          labels: feature.labels,
          requester: feature.requesterUID,
          accounts: feature.accounts,
          totalValue: null,
          accountName: null,
          accountId: null,
          accountValue: null,
          accountSalesForceUrl: null,
          accountCountry: null,
          accountStatus: null,
          accountPrevProducts: null,
          accountNotes: null
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
    arrayForExport.forEach((feature, i) => {
      // console.log(feature.location)
      if (feature.location && feature.location.indexOf('-' === 0)) {
        if (locations[feature.location]) {
          arrayForExport[i].location = locations[feature.location].displayName
        }
        
      }
    });

    // labels
    const labelsResult = await db.ref('labels').once('value')
    const labels = labelsResult.val()

    arrayForExport.forEach((feature, i) => {
      if (feature.labels) {
        let featureLabelsArray = [];

        feature.labels.forEach((label) => {
          if (labels[label]) {
            featureLabelsArray.push(labels[label].displayName)
          }
        })

        arrayForExport[i].labels = featureLabelsArray.join(', ')

      }
    });

    // requester info
    const usersResult = await db.ref('users').once('value')
    const users = usersResult.val()

    // get user email
    arrayForExport.forEach((feature, i) => {
      if (feature.requester) {
        if (users[feature.requester]) {
          arrayForExport[i].requester = users[feature.requester].email
        }
        
      }
    });

    // accounts
    const accountsResult = await db.ref('accounts').once('value')
    const accounts = accountsResult.val()

    let resultArray = []

    arrayForExport.forEach((feature, i) => {
      if (feature.accounts) {
        
        // build account array
        let accountArray = []
        feature.accounts.forEach((account) => {
          accountArray.push(account.accountKey)
        })
        
        let totalAccountValue = 0;
        let multiAccountFeatureRows = []

        accountArray.forEach((account) => {
          

          // get total value
          if (accounts[account]) {
            totalAccountValue = totalAccountValue + parseInt(accounts[account].value)
          }
          
          arrayForExport[i].totalValue = totalAccountValue
          
          // add rows for each account
          let accountInfo = Object.assign({}, arrayForExport[i])

          accountInfo.accountName = accounts[account].name
          accountInfo.accountId = accounts[account].cid
          accountInfo.accountValue = accounts[account].value
          accountInfo.accountSalesForceUrl = accounts[account].salesForceUrl
          accountInfo.accountCountry = accounts[account].country
          accountInfo.accountStatus = accounts[account].accountType
          if (Array.isArray(accounts[account].platform)) {
            accountInfo.accountPrevProducts = accounts[account].platform.join(', ')
          } else {
            accountInfo.accountPrevProducts = accounts[account].platform || null
          }
          accountInfo.accountNotes = accounts[account].customerNotes

          resultArray.push(accountInfo)
        })

      }
      
    });

    // write to file
    try {
      const result = json2csv({ data: resultArray, fields: fields })
      fs.writeFile(
        
        './../../bin/exports/export.csv',
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