var AWS = require("aws-sdk");

// Example model
AWS.config.update({
  region: 'us-west-2',
  endpoint: 'https://dynamodb.us-west-2.amazonaws.com'
});
var docClient = new AWS.DynamoDB.DocumentClient();



module.exports = {

  getAllData: function() {
    return new Promise(function(resolve, reject) {
      docClient.scan({
        TableName: process.env.TABLE_NAME
      }, function(err, data) {
        if (err) {
          console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
        } else {
          // print all the movies
          if (data) {
            resolve(data);
          } else {
            reject(err);
          }
        }
      });
    });
  },

  addData: function(req, res) {
    console.log(req.body);
    var params = {
      TableName: process.env.TABLE_NAME,
      Item: req.body
    };
    if (!req.body.add) {
      res.send("data received but not added")
    } else {
      docClient.put(params, function(err, data) {
        if (err) {
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
          res.send("Item Add Succeeded: " + data);
        }
      });
    }
  }
};
