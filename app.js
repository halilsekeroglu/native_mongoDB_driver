const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'FruitDB';

// Create a new MongoClient
const client = new MongoClient(url, {
    useUnifiedTopology: true
});

// Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertDocuments(db, function () {
        client.close();
    });
});


function insertDocuments (db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Insert some documents
    collection.insertMany([
        { name:"APPLE",
        score:8,
        review:"Great Fruit"
       }, 
        {
            name: "Orange",
            score: 6,
            review: "Kind Sour"
        },
        {
            name: "Banana",
            score: 9,
            review: "Great Stuff!"
        },
    ], 
    
    function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}