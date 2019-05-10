const mongo = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const posts = require("./posts.js");

const url = "mongodb://127.0.0.1:27017/Jiaqian_Zhang_lab7";

async function create(name, animalType) {
    if(name == undefined || animalType == undefined)
        throw "parameters are missing.";
    if(typeof name != 'string' || typeof animalType != 'string')
        throw "format error";
    var result = [];
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection('animals').insert({"name": name, "animalType": animalType, "likes": []},(err, res) => {
                if(err) {
                    db.close();
                    throw "insert error";
                }
                db.close();
                result = res["ops"];
                resolve(result);
            })
        })
    })
    promise.then(function(value) {
        return value;
    })
    return promise;
}

async function getALL() {
    var res = [];
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            var find = db.collection("animals").find();
            find.each((err, ress) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                if(ress != null) {
                    res.push(ress);
                }
                else {
                    db.close();
                    resolve(res);
                }
            });
        });
    })
    promise.then(function(value) {
        return value;
    })
    return promise;
}

async function getAll() {
    const res = await getALL();
    if(res.length == 0)
        throw "no such data";
    return res;
}

async function getID(id) {
    if(id == undefined)
        throw "parameter is missing";
    if(typeof id != 'string')
        throw "parameter is error format";
    var res = [];
    var ID = new ObjectID(id);
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            var find = db.collection("animals").find({"_id": ID});
            find.each((err, ress) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                if(ress != null) {
                    res.push(ress);
                }
                else {
                    db.close();
                    resolve(res);
                }
            });
        });
    })
    promise.then(function(value) {
        return value;
    })
    return promise;
}

async function get(id) {
    const res = await getID(id);
    if(res.length == 0)
        throw "no such data";
    return res;
}

async function remove(id) {
    if(id == undefined)
        throw "parameter is missing";
    if(typeof id != 'string')
        throw "parameter is error format";
    var ID = new ObjectID(id);
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("animals").deleteMany({"_id": ID} , (err, res) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                db.close();
                resolve(res.result.n);
            });
        });
    })
    promise.then(function(value) {
        return value;
    })
    return promise;
}

async function removeAll() {
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("animals").deleteMany({} , (err, res) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                db.close();
                resolve("true");
            });
        });
    })
    promise.then(function(value) {
        return value;
    })
    return promise;
}

async function rename(id, name, animalType) {
    if(id == undefined || name == undefined || animalType == undefined)
        throw "parameter is missing";
    if(typeof id != 'string' || typeof name != 'string' || typeof animalType != 'string')
        throw "sb";
    const res1 = await get(id);
    if(res1.length == 0)
        throw "no such data";
    var ID = new ObjectID(id);
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("animals").updateMany({"_id": ID}, {$set:{"name": name, "animalType": animalType}}, (err, res) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                db.close();
                resolve("rename successful");
            });
        });
    })
    promise.then(function(value) {
        return value;
    })
    return promise;
}

async function liking(id, likes) {
    if(id == undefined || likes == undefined)
        throw "parameter is missing";
    if(typeof id != 'string' || typeof likes != 'string')
        throw "error of format";
    var ID = new ObjectID(id);
    const res1 = await get(id);
    const res2 = await posts.get(likes);
    if(res1.length == 0)
        throw "no such data";
    const like2 = res1[0]["likes"];
    if(res2.length == 0)
        throw "no such data";
    for(var i = 0 ; i < like2.length; i++)
        if(likes == like2[i])
            return "exists";
    like2.push(likes);
    var promise = new Promise(function(resolve) {
        mongo.connect(url, (err, db) => {
            if(err)
                throw "database connect failed";
            db.collection("animals").updateMany({"_id": ID}, {$set:{"likes": like2}}, (err, res) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                db.close();
                resolve("like successful");
            });
        })
    });
    promise.then(function(value) {
        return value;
    })
    return promise;
}

async function unliking(id, likes) {
    if(id == undefined || likes == undefined)
        throw "parameter is missing";
    if(typeof id != 'string' || typeof likes != 'string')
        throw "error of format";
    var ID = new ObjectID(id);
    const res1 = await get(id);
    if(res1.length == 0)
        throw "no such data";
    const like2 = res1[0]["likes"];
    var boo = true;
    for(var i = 0 ; i < like2.length; i++)
        if(likes == like2[i]) {
            like2.splice(i, 1);
            boo = false;
            break;
        }
    if(boo)
        throw "no such data";
    var promise = new Promise(function(resolve) {
        mongo.connect(url, (err, db) => {
            if(err)
                throw "database connect failed";
            db.collection("animals").updateMany({"_id": ID}, {$set:{"likes": like2}}, (err, res) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                db.close();
                resolve("unlike successful");
            });
        })
    });
    promise.then(function(value) {
        return value;
    })
    return promise;
}

async function getSides(id) {
    if(id == undefined)
        throw "parameter is missing";
    if(typeof id != 'string')
        throw "parameter is error format";
    var res = [];
    var ID = new ObjectID(id);
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            var find = db.collection("animals").find({"_id": ID});
            //console.log(find);
            find.each((err, ress) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                if(ress != null) {
                    const resss = {"_id": ress["_id"], "name": ress["name"]};
                    res.push(resss);
                }
                else {
                    if(res.length == 0)
                        throw "no such data";
                    db.close();
                    resolve(res);
                }
            });
        });
    })
    promise.then(function(value) {
        return value;
    })
    return promise;
}

module.exports = {
    create,
    getAll,
    get,
    remove,
    rename,
    removeAll,
    liking,
    unliking,
    getSides
}