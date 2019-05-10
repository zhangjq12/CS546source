const search = require("./search.js");
const details = require("./details");

const constructorMethod = app => {
    app.get("/", (req, res) => {
        res.render('posts/index', {title: "People Finder", personName: ""});
    });
    app.use("/search", search);
    app.use("/details", details);

    app.use("*", (req, res) => {
        res.status(404).json({ error: "404 Not found" });
    });
};

module.exports = constructorMethod;