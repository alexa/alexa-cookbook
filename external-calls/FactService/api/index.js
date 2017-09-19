const AWSregion = 'us-east-1';  // us-east-1
const TableName = 'FactList';

var AWS = require('aws-sdk');
AWS.config.update({
    region: AWSregion
});

exports.handler = function(event, context, callback) {

    if(event.appId.length != 52 || event.appId.substring(0,16) != 'amzn1.ask.skill.') {
        callback(null, {}); //
    }
    console.log(event.appId.substring(0,16));

    // console.log('starting lambda function');
    console.log(event.appId);

    //console.log(event.list.toString());
    //console.log(JSON.stringify(event));
    if(event.list) {
        console.log('storing new list');

        var params = {
            TableName: TableName,
            Item:{
                "appId":  event.appId,
                "list":   event.list
            }
        };
        writeDynamoItem(params, myResult=>{
            callback(null, myResult);
            // callback(null, {"statusCode": 200, "body":  JSON.parse(myResult) });

        });

    } else {
        console.log('reading list');

        var params = {
            TableName: TableName,
            Key:{ "appId":  event.appId }
        };

        readDynamoItem(params, myResult=>{

            console.log( myResult == '{}');

            if (myResult != '{}') {
                callback(null, JSON.parse(myResult).Item.list);

            } else {
                callback(null, []);

            }


        });
    }

};

// -----------------------------------------

function readDynamoItem(params, callback) {

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});

    var docClient = new AWS.DynamoDB.DocumentClient();

    console.log('reading item from DynamoDB table');

    docClient.get(params, (err, data) => {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            // console.log("readDynamoItem succeeded:", JSON.stringify(data, null, 2));

            callback(JSON.stringify(data));


        }
    });

}
// -----------------------------------------
function writeDynamoItem(params, callback) {

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});

    var docClient = new AWS.DynamoDB.DocumentClient();

    console.log('writing item to DynamoDB table');

    docClient.put(params, (err, data) => {
        if (err) {
            console.error("Unable to write item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            //console.log('writeDynamoItem succeeded:", JSON.stringify(data, null, 2));

            callback(JSON.stringify(data));

        }
    });

}
