const express = require("express");
const router = express.Router();
const data = require("../data/");
const peopleData = data.people;

router.post("/", async (req, res) => {
    const request = req.body;
    const data = request["personName"];
    try {
        const posts = await peopleData.getByName(data);
        if(posts.length == 0) {
            res.render('posts/search', {title: "People Found", personName: data, notfound: "We're sorry, but no results were found for " + data + "."});
            return;
        }
        res.render('posts/search', {title: "People Found", personName: data, search: posts});
    }
    catch(e) {
        res.status(400).render('posts/search', {title: "People Found", personName: data, error: e});
    }
});

module.exports = router;
