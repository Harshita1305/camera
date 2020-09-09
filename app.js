require('dotenv').config()
const express = require("express");
const { compileFunction } = require("vm");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
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
    //const secret = "qwertyuiop"
signSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['Password'] });
const User = new mongoose.model('User', signSchema)



app.get("/", function(request, response) {
    response.sendFile(__dirname + "/index.html")
});

app.get("/signin", function(req, res) {
    //    res.send("here");
    res.render("signin");
});
app.post("/signin", function(req, res) {
    var UserName = req.body.email;
    var password = req.body.password;
    User.findOne({ 'Username': UserName }, function(err, founduser) {
        if (err) {
            console.log(err)
            console.log("not found")
        } else {
            //console.log(founduser.Password);
            if (founduser) {
                console.log(founduser.Password);
                if (founduser.Password === password) {
                    console.log(UserName);
                    console.log(password);
                    res.redirect("done");
                }
            } else {
                console.log(founduser);
                console.log("wrong password");
            }
        }
    })


})
app.get("/done", function(req, res) {
    res.render("done");
})

app.get("/signup", function(req, res) {
    res.render("signup");
});

app.post("/signup", function(req, res) {
    var user = new User({
        name: req.body.name,
        sex: req.body.sex,
        DateOfBirth: req.body.dob,
        PlaceofBirth: req.body.pob,
        pNumber: req.body.pnum,
        Username: req.body.username,
        Password: req.body.password
    })
    user.save();
    console.log(user);
    res.render("done");
})

app.listen(3000, function() {
    console.log("server started");
});