const express = require("express");
const router = express.Router();
//const data = require("../data/");
const animals = require("../data/animals.js");
const posts = require("../data/posts.js");

router.get("/:id", async (req, res) => {
    try {
        const post = await posts.get(req.params.id);
        for(var i = 0; i < post.length; i++) {
            try{
                const postsout = await animals.getSides(post[i]["author"]);
                post[i]["author"] = postsout;
            }
            catch(e) {
                post[i]["author"] = [];
            }
        }
        res.json(post);
    } catch (e) {
        res.status(404).json({ message: "Post not found" });
    }
});

router.get("/", async (req, res) => {
    try {
        const post = await posts.getAll();
        for(var i = 0; i < post.length; i++) {
            try{
                const postsout = await animals.getSides(post[i]["author"]);
                post[i]["author"] = postsout;
            }
            catch(e) {
                post[i]["author"] = [];
            }
        }
        res.json(post);
    } catch (e) {
        res.status(404).json({ message: "Post not found" });
    }
});

router.post("/", async (req, res) => {
    const request = req.body;
    //res.json(request);
    try {
        const {title, author, content} = request;
        const post = await posts.create(title, author, content);
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
        const post = await posts.get(req.params.id);
        /*if(post.length == 0)
            throw "error";*/
        console.log(post);
        const result = post[0];
        try {
            var send = new Object();
            if(request["newTitle"] != null && request["newContent"] != null)
                send = request;
            else
            if(request["newTitle"] != null) {
                send["newTitle"] = request["newTitle"];
                send["newContent"] = result["content"];
            }
            else
            if(request["newContent"] != null) {
                send["newTitle"] = result["title"];
                send["newContent"] = request["newContent"];
            }
            console.log(send);
            const post = await posts.update(req.params.id, send["newTitle"], send["newContent"]);
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
        const post = await posts.get(req.params.id);
        result["data"] = post[0];
        const del = await posts.remove(req.params.id);
        if(del)
            result["deleted"] = true;
        res.json(result);
        res.status(200).json("delete success!");
    }
    catch(e) {
        res.status(404).json({ message : "id doesn't exist"});
    }
});

module.exports = router;
