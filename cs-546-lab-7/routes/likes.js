const express = require("express");
const router = express.Router();
//const data = require("../data/");
const animals = require("../data/animals.js");
const posts = require("../data/posts.js");

router.post("/:id", async (req, res) => {
    try {
        const like = await animals.liking(req.params.id, req.query.postId);
        const post = await animals.get(req.params.id);
        for(var i = 0; i < post.length; i++) {
            var likes = [];
            for(var j = 0; j < post[i]["likes"].length; j++) {
                const liking = await posts.get(post[i]["likes"][j]);
                likes.push(liking);
            }
            post[i]["likes"] = likes;
            try{
                const postsout = await posts.getByAuthor(post[i]["_id"]);
                post[i]["posts"] = postsout;
            }
            catch(e) {
                post[i]["posts"] = [];
            }
        }
        res.status(200).json(like);
        res.json(post);
    } catch (e) {
        res.status(404).json({ message: "Post not found" });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const like = await animals.unliking(req.params.id, req.query.postId);
        const post = await animals.get(req.params.id);
        for(var i = 0; i < post.length; i++) {
            var likes = [];
            for(var j = 0; j < post[i]["likes"].length; j++) {
                const liking = await posts.get(post[i]["likes"][j]);
                likes.push(liking);
            }
            post[i]["likes"] = likes;
            try{
                const postsout = await posts.getByAuthor(post[i]["_id"]);
                post[i]["posts"] = postsout;
            }
            catch(e) {
                post[i]["posts"] = [];
            }
        }
        res.status(200).json(like);
        res.json(post);
    } catch (e) {
        res.status(404).json({ message: "Post not found" });
    }
});

module.exports = router;
