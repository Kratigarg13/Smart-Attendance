
const getDb = require("../database").getDb

class Product{
    constructor(name, rollNumber, totalhidden){
        this.name = name
        this.rollNumber = rollNumber
        this.totalhidden = totalhidden
    }


    save(callback){

        const db = getDb();

        db.collection("product").insertOne(this)
        .then(() => {
            callback()
        })

    }
}

module.exports = Product
