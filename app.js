const express = require("express");
const { compileFunction } = require("vm");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/signupdb', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
mongoose.set('useCreateIndex', true);


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
const signSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    Sex: String,
    DateOfBirth: Date,
    PlaceofBirth: String,
    pNumber: String,
    Username: {
        type: String,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
})
const User = new mongoose.model('User', signSchema)



app.get("/", function(request, response) {
    response.sendFile(__dirname + "/index.html")
});

app.get("/signin", function(req, res) {
    //    res.send("here");
    res.render("signin");
});
app.post("/signin", function(req, res) {
    var Email = req.body.email;
    var password = req.body.password;
    console.log(Email);
    console.log(password);
    res.redirect("done");

})
app.get("/done", function(req, res) {
    res.render("done");
})

app.get("/signup", function(req, res) {
    res.render("signup");
});

app.listen(3000, function() {
    console.log("server started");
});