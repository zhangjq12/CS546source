const mongo = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;

const url = "mongodb://127.0.0.1:27017/Jiaqian_Zhang_lab7";

async function create(title, author, content) {
    if(title == undefined || author == undefined || content == undefined)
        throw "parameters are missing.";
    if(typeof title != 'string' || typeof author != 'string' || typeof content != 'string')
        throw "format error";
    //var Author = new ObjectID(author);
    var result = [];
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection('posts').insert({"title": title, "author": author, "content": content},(err, res) => {
                if(err) {
                    db.close();
                    throw "insert error";
                }
                db.close();
                result = res["ops"];
                console.log(result);
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
            var find = db.collection("posts").find();
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
    var ID = new ObjectID(id);
    var res = [];
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            var find = db.collection("posts").find({"_id": ID});
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

async function getByAuthor(author) {
    if(author == undefined)
        throw "parameter is missing";
    if(typeof author != 'object') {
        throw "parameter is error format";
    }
    var Author = author.toHexString();
    var res = [];
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                console.log("sb2");
                throw "database connection failed!";
            }
            var find = db.collection("posts").find({"author": Author});
            find.each((err, ress) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                if(ress != null) {
                    const resss = {"_id": ress["_id"], "title": ress["title"]};
                    res.push(resss);
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
            db.collection("posts").deleteMany({"_id": ID} , (err, res) => {
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

async function removeByAuthor(id) {
    if(id == undefined)
        throw "parameter is missing";
    if(typeof id != 'string')
        throw "parameter is error format";
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("posts").deleteMany({"author": id} , (err, res) => {
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
            db.collection("posts").deleteMany({} , (err, res) => {
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

async function update(id, title, content) {
    if(id == undefined || title == undefined || content == undefined)
        throw "parameter is missing";
    if(typeof id != 'string' || typeof title != 'string' || typeof content != 'string')
        throw "sb";    
    /*const res1 = await get(id);
    console.log(res1.length);
    if(res1.length == 0)
        throw "no such data";*/
    var ID = new ObjectID(id);
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("posts").updateMany({"_id": ID}, {$set:{"title": title, "content": content}}, (err, res) => {
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

module.exports = {
    create,
    getAll,
    get,
    remove,
    update,
    removeAll,
    getByAuthor,
    removeByAuthor
}