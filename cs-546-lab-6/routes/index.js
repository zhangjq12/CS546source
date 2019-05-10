const story = require("./story");
const about = require("./about");
const edu = require("./education");

const constructorMethod = app => {
    app.use("/about", about);
    app.use("/story", story);
    app.use("/education", edu);

    app.use("*", (req, res) => {
        res.status(404).json({ error: "404 Not found" });
    });
};

module.exports = constructorMethod;