const express = require("express");
const router = express.Router();
const data = require("../data");
const story = data.story;

router.get("/", async (req, res) => {
    try {
        res.json(story);
    }
    catch(e) {
        res.status(404).json({message: "Not found JSON"});
    }
});

module.exports = router;