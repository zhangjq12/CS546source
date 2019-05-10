const animal = require("./data/animal.js");

async function main() {
    var res1;
    var res2;
    var res3;
    try {
        res1 = await animal.removeAll();
        console.log(res1);
    }
    catch(err) {
        console.log(err);
    }
    try {
        res1 = await animal.create("Sasha", "Dog");
        console.log(res1);
    }
    catch(err) {
        console.log(err);
    }
    var id1 = res1[0]["_id"];
    try {
        var g1 = await animal.get(id1);
        console.log(g1);
    }
    catch(err) {
        console.log(err);
    }
    try {
        res2 = await animal.create("Lucy", "Dog");
        console.log(res2);
    }
    catch(err) {
        console.log(err);
    }
    var id2 = res2[0]["_id"];
    try {
        var g1 = await animal.getAll();
        console.log(g1);
    }
    catch(err) {
        console.log(err);
    }
    try {
        res3 = await animal.create("Duke", "Walrus");
        console.log(res3);
    }
    catch(err) {
        console.log(err);
    }
    var id3 = res3[0]["_id"];
    try {
        var g1 = await animal.get(id3);
        console.log(g1);
    }
    catch(err) {
        console.log(err);
    }
    try {
        var g1 = await animal.rename(id1, "Sashita");
        console.log(g1);
    }
    catch(err) {
        console.log(err);
    }
    try {
        var g1 = await animal.get(id1);
        console.log(g1);
    }
    catch(err) {
        console.log(err);
    }
    try {
        var g1 = await animal.remove(id2);
        console.log(g1);
    }
    catch(err) {
        console.log(err);
    }
    try {
        var g1 = await animal.getAll();
        console.log(g1);
    }
    catch(err) {
        console.log(err);
    }
}

main();