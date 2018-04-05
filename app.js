var path= require('path');
var express= require('express');
var bodyParser= require('body-parser');
var cookieParser= require('cookie-parser');
var flash= require('connect-flash');
var ejs= require('ejs');
var session= require('express-session');
var passport= require('passport');
var setUpPassport= require('./setuppassport');
var mongoose= require('mongoose');
var routes= require("./routes");
var app= express();
mongoose.connect("mongodb://localhost:27017/test");
setUpPassport();
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: "bcbayiby",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.listen(app.get("port"), function(){
    console.log("Server started on port " + app.get("port"));
})
