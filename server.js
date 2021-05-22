const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passportAuthenticationProcess = require("./passportAuthanticationProcess");
const passportConfig = require("./passportConfig");

const port = process.env.PORT;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(session({
    secret: "Welcome to the best web site",
    resave: false,
    saveUninitialized: false,
    expires: new Date(Date.now() + (30 * 86400 * 1000))
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/QuizDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set("useCreateIndex", true);

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    quizzes: [],
    name: String,
    facebookId: String
}, {strict: false});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

const User = new mongoose.model("user", UserSchema);
passport.use(User.createStrategy());
passportConfig(passport, User, GoogleStrategy, FacebookStrategy);
passportAuthenticationProcess(app, User, passport);


app.get("/", (req, res) => {
    res.render("wiseQuiz");
});
app.get("/login", ((req, res) => {
    res.render("userLogin");
}))


app.listen(port || 3000, function () {
    console.log("system is work on" + 3000);
})
