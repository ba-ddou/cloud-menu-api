var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://root:<password>@<hostname>/myFirstDatabase?ssl=true&replicaSet=atlas-mv0cbw-shard-0&authSource=admin&retryWrites=true&w=majority";
MongoClient.connect(uri, function(err, client) {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});