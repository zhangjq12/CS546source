const express = require("express");
const router = express.Router();
const data = require("../data");
const about = data.about;

router.get("/", async (req, res) => {
    try {
        res.json(about);
    }
    catch(e) {
        res.status(404).json({message: "Not found JSON"});
    }
});

module.exports = router;