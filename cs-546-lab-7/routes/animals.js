const express = require("express");
const router = express.Router();
//const data = require("../data/");
const animals = require("../data/animals.js");
const posts = require("../data/posts.js");

router.get("/:id", async (req, res) => {
    try {
        const post = await animals.get(req.params.id);
        for(var i = 0; i < post.length; i++) {
            var likes = [];
            for(var j = 0; j < post[i]["likes"].length; j++) {
                const likingAll = await posts.get(post[i]["likes"][j]);
                const liking = {"_id": likingAll[0]["_id"], "title": likingAll[0]["title"]};
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
        res.json(post);
    } catch (e) {
        res.status(404).json({ message: "Post not found" });
    }
});

router.get("/", async (req, res) => {
    try {
        const post = await animals.getAll();
        for(var i = 0; i < post.length; i++) {
            var likes = [];
            for(var j = 0; j < post[i]["likes"].length; j++) {
                const likingAll = await posts.get(post[i]["likes"][j]);
                const liking = {"_id": likingAll[0]["_id"], "title": likingAll[0]["title"]};
                likes.push(liking);
            }
            post[i]["likes"] = likes;
            try{
                const postsout = await posts.getByAuthor(post[i]["_id"]);
                //console.log(postsout);
                post[i]["posts"] = postsout;
            }
            catch(e) {
                post[i]["posts"] = [];
            }
        }
        res.json(post);
    } catch (e) {
        res.status(404).json({ message: "Post not found" });
    }
});

router.post("/", async (req, res) => {
    const request = req.body;
    try {
        const {name, animalType} = request;
        const post = await animals.create(name, animalType);
        res.json(post);
        res.status(200).json({message: "Success!"});
    }
    catch(e) {
        res.status(400).json({ message : "Post failed"});
    }
});

router.put("/:id", async (req, res) => {
    const request = req.body;
    try {
        const post = await animals.get(req.params.id);
        const result = post[0];
        try {
            var send = new Object();
            if(request["newName"] != null && request["newType"] != null)
                send = request;
            else
            if(request["newName"] != null) {
                send["newName"] = request["newName"];
                send["newType"] = result["animalType"];
            }
            else
            if(request["newType"] != null) {
                send["newName"] = result["name"];
                send["newType"] = request["newType"];
            }
            const post = await animals.rename(req.params.id, send["newName"], send["newType"]);
            res.json(post);
            res.status(200).json({message: "Success!"});
        }
        catch(e) {
            res.status(400).json({ message : "Post failed"});
        }
    }
    catch(e) {
        res.status(404).json({message: "id doesn't exist"});
    }
});

router.delete("/:id", async (req, res) => {
    try {
        var result = {"deleted":"false", "data": null};
        const post = await animals.get(req.params.id);
        result["data"] = post[0];
        const del = await animals.remove(req.params.id);
        const delposts = await posts.removeByAuthor(req.params.id);
        if(del && delposts)
            result["deleted"] = true;
        res.json(result);
        res.status(200).json("delete success!");
    }
    catch(e) {
        res.status(404).json({ message : "id doesn't exist"});
    }
});

module.exports = router;
