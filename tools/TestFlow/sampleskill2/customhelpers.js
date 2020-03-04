

const constants = require('./constants.js');
const helpers = require('./helpers.js');
const AWS = constants.AWS;
const DYNAMODB_TABLE = constants.DYNAMODB_TABLE;

module.exports = {


    'getColorSummary': function (callback) {

        const params = {
            TableName: DYNAMODB_TABLE
        };

        let docClient = new AWS.DynamoDB.DocumentClient();

        // console.log('scanning items from DynamoDB table');

        docClient.scan(params, (err, data) => {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));

            } else {
                let colorTally = [];

                for (let i = 0; i < data.Items.length; i++) {
                    let item = data.Items[i];
                    // console.log(item.attributes.favoriteColor);
                    if (item.attributes.favoriteColor) {
                        helpers.incrementArray(colorTally, item.attributes.favoriteColor);
                    }

                }
                colorTally = helpers.sortArray(colorTally);
                colorTally = helpers.rankArray(colorTally);

                // console.log(JSON.stringify(colorTally, null, 2));

                const recordCount = data.Items.length;
                callback(recordCount);
            }
        });

    }
};
