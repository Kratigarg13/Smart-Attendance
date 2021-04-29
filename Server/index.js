const express = require("express")
const monogConnect = require("./database").mongoConnect
const cors = require("cors")
const Product = require("./models/product")

const app = express();

app.use(express.json())


app.use(cors.apply({
    origin : '*'        
}))


app.post("/saveData",(req,res) => {

    console.log("Checking req");
    console.log( req.body);
    console.log("Checking req");
    const name = req.body.studentName;
    const rollNumber = req.body.studentId;
    const totalhidden = req.body.totalTime;

    const product =new Product(name, rollNumber, totalhidden);
    console.log(product);

    product.save(() => {
        console.log("done")
    })

})


monogConnect(() => {

    app.listen(3000,() => {
        console.log("server started")
    })

})

