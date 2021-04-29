const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let db = null

const mongoConnect = (callback) => {
    MongoClient.connect("mongodb://localhost:27017/CN_Attendance")
    .then(client => {
        db = client.db();
        console.log("here");
        callback()
    })
    .catch(err => {
        console.log(err)
    })
}

const getDb = () => {
    if(db) return db
}

module.exports = {
    mongoConnect,
    getDb
}