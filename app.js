const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { query } = require("express");

const app = express();

app.use(bodyParser.urlencoded({extended:"true"}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/multipurpose");

const QuerySchema = new mongoose.Schema({
    name : "String",
    email : "String",
    Message : "String"
})

const Query = mongoose.model("Query", QuerySchema);

const test = new Query({
    name : "Sultan",
    email : "Sultan01@gmail.com",
    Message : "hello"
})
// test.save()


app.get("/" , function(req,res) {
    res.sendFile("/index.html")
});

app.post("/", function (req,res) {
    
    
    let Name = req.body.Name
    let Email = req.body.Email
    let Msg = req.body.Message

    const userMessage = new Query({
        name : Name,
        email : Email,
        Message : Msg

    });
    userMessage.save();

    res.render("index")


    
});

app.listen( process.env.PORT ||3000 ,function (req,res) {
    console.log("Server is started on port 3000");
});