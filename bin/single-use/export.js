const fs = require('fs')
const path = require('path')
const admin = require('firebase-admin')
const json2csv = require('json2csv');
const fields = ['status','labels','subject','description','location','date','requester','totalValue','accountName','accountId','accountValue','accountSalesForceUrl','accountCountry','accountStatus','accountPrevProducts','accountNotes','accountRelationshipToRequest'];

const serviceAccount = require("../key/key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cision-feedback-dev.firebaseio.com"
});

const db = admin.database()

async function start () {
  try {
    
    console.info('start!')
    
    const featuresFlat = []
    
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
          accountNotes: null,
          accountRelationshipToRequest: null
        };
        await featuresFlat.push(featureObject)
        // await db.ref(`features/${key}/product`).set(idxProducts[feature.product])
      } catch(e) {
        console.info(e);
        console.info('error, exiting')
        process.exit(1)
      }
    })

    // get location
    const locationsResult = await db.ref('locations').once('value')
    const locations = locationsResult.val()

    // get labels
    const labelsResult = await db.ref('labels').once('value')
    const labels = labelsResult.val()
    
    // get users
    const usersResult = await db.ref('users').once('value')
    const users = usersResult.val()
    
    // get accounts
    const accountsResult = await db.ref('accounts').once('value')
    const accounts = accountsResult.val()

    let featuresFlatForExport = []

    featuresFlat.forEach((feature, i) => {

      // set location meta
      if (feature.location && feature.location.indexOf('-' === 0)) {
        if (locations[feature.location]) {
          featuresFlat[i].location = locations[feature.location].displayName
        }
      }

      // set label meta
      if (feature.labels) {
        let featureLabelsArray = [];
  
        feature.labels.forEach((label) => {
          if (labels[label]) {
            featureLabelsArray.push(labels[label].displayName)
          }
        })
  
        featuresFlat[i].labels = featureLabelsArray.join(', ')
      }

      // set user email
      if (feature.requester) {
        if (users[feature.requester]) {
          // console.log(users[feature.requester].email);
          featuresFlat[i].requester = users[feature.requester].email;
        }
      }
      
      if (feature.accounts) {
        // build account array
        let accountArray = [];
        feature.accounts.forEach(account => {
          accountArray.push(account.accountKey);
        });
        
        let totalAccountValue = 0;
        let multiAccountFeatureRows = [];
        
        accountArray.forEach((account, accountIndex) => {
          // get total value
          if (accounts[account]) {
            totalAccountValue = totalAccountValue + parseInt(accounts[account].value);
          }
          console.log(featuresFlat[i].requester);

          featuresFlat[i].totalValue = totalAccountValue;
          // add rows for each account
          let accountInfo = Object.assign({}, featuresFlat[i]);

          accountInfo.accountName = accounts[account].name;
          accountInfo.accountId = accounts[account].cid;
          accountInfo.accountValue = accounts[account].value;
          accountInfo.accountSalesForceUrl = accounts[account].salesForceUrl;
          accountInfo.accountCountry = accounts[account].country;
          accountInfo.accountStatus = accounts[account].accountType;
          if (Array.isArray(accounts[account].platform)) {
            accountInfo.accountPrevProducts = accounts[account].platform.join(", ");
          } else {
            accountInfo.accountPrevProducts = accounts[account].platform || null;
          }
          accountInfo.accountNotes = accounts[account].customerNotes;
          accountInfo.accountRelationshipToRequest = feature.accounts[accountIndex].accountTie;

          featuresFlatForExport.push(accountInfo);
        });
      } else {
        featuresFlatForExport.push(featuresFlat[i]);
      }

    });

    // write to file
    try {
      const result = json2csv({ data: featuresFlatForExport, fields: fields })
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


    console.info('done!')
    // process.exit(1)
  } catch (e) {
    console.error(e)
    console.info('error, exiting')
    process.exit(1)
  }
}

start()