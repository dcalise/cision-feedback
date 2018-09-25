const admin = require('firebase-admin');

const serviceAccount = require('../key/key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://cision-feedback-dev.firebaseio.com'
});

const db = admin.database();

async function start() {
    try {
        console.log('starting');

        // accounts
        const idxAccounts = {};
        const accountsResult = await db.ref('accounts').once('value');
        const accounts = accountsResult.val();

        Object.keys(accounts).forEach(key => {
            const item = accounts[key];
        });

        const featuresResult = await db.ref('features').once('value');
        const features = featuresResult.val();

        Object.keys(features).forEach(key => {
            const accountList = features[key].accounts;

            if (accountList) {
                accountList.forEach(accountObject => {
                    if (!accounts[accountObject.accountKey].features) {
                        accounts[accountObject.accountKey].features = []
                    }
                    accounts[accountObject.accountKey].features.push({
                      featureKey: key,
                      featureTie: accountObject.accountTie
                    });
                });
            }
        });


        try {
          await db.ref('accounts').set(accounts);
        } catch(e) {
          console.log(e);
          process.exit(1);
        }
    } catch (e) {
        console.error(e);
        console.log('error, exiting');
        process.edit(1);
    }
}

start();
