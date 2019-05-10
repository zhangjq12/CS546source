const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const exphbs = require('express-handlebars');
const session = require('express-session');
const bcrypt = require('bcrypt');
const data = require("./data");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
}));

function Authentication(req, res, next){
    if(req.session.AuthCookie) {
        next();
    }
    else {
        res.status(403).render("error", {title: "Error"});
    }
}

var Logging = (req, res, next) => {
    const Time = new Date().toUTCString();
    const method = req.method;
    const originalUrl = req.originalUrl;
    const auth = req.session.AuthCookie ? "Authenticated User" : "Non-Authenticated User";
    console.log("[" + Time + "]: " + method + " " + originalUrl + " (" + auth + ")");
    next();
}

app.use(Logging);

var index = -1;

app.get("/", (req, res) => {
    if(req.session.AuthCookie) {
        res.redirect("/private");
    }
    else {
        res.render("login", {title: "Log in"});
    }
});

app.get("/private", Authentication, (req, res) => {
    const user = data[index];
    res.render("private", {title: user["firstName"] + " " + user["lastname"] + "'s Information", id: user["_id"], username: user["username"], firstName: user["firstName"], lastName: user["lastName"], profession: user["profession"], bio: user["bio"]});
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

app.post("/login", async (req, res) => {
    const request = req.body;
    for(var i = 0; i < data.length; i++) {
        if(request["username"] == data[i]["username"])
            index = i;
    }
    const judge = await bcrypt.compare(request["password"], data[index]["hashedPassword"]);
    if(index != -1 && judge) {
        req.session.AuthCookie = 1;
        res.redirect("/");
    }
    else {
        res.status(401).render("login", {title: "Log in", error: "Did not provide a valid username and/or password!"});
    }
});

app.use("*", (req, res) => {
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("The Server Has Been Connected! Port Is 3000");
});