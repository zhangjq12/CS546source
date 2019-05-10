const express = require("express");
const router = express.Router();
const data = require("../data/");
const peopleData = data.people;

router.get("/:id", async (req, res) => {
    try {
        const posts = await peopleData.getPersonById(parseInt(req.params.id));
        res.render('posts/details', {title: "Person Found", personName: posts["firstName"] + " " + posts["lastName"], id: posts["id"], firstName: posts["firstName"], lastName: posts["lastName"], address: posts["address"], zip: posts["zip"], phone: posts["phone"], ssn: posts["ssn"]});
    }
    catch(e) {
        res.status(400).render('posts/details', {title: "Person Found", personName: posts["firstName"] + " " + posts["lastName"], error: e});
    }
});

module.exports = router;
