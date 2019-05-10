const express = require("express");
const router = express.Router();
const data = require("../data");
const edu = data.education;

router.get("/", async (req, res) => {
    try {
        res.json(edu);
    }
    catch(e) {
        res.status(404).json({message: "Not found JSON"});
    }
});

router.get("/:degree", async (req, res) => {
    try {
        var result;
        for(var i = 0; i < edu.length; i++)
            if(edu[i]["degree"] == req.params.degree)
                result = edu[i];
        if(result == null)
            throw "error";
        res.json(result);
    }
    catch(e) {
        res.status(404).json({message: "Not found JSON"});
    }
});

module.exports = router;