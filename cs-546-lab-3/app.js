const people = require('./people.js');
const weather = require('./weather.js');
const work = require('./work.js');

async function main() {
    console.log("Get person by ID test");
    console.log();
    console.log("Pass test:");
    try{
        var gp1 = await people.getPersonById(333);
        console.log(gp1);
    }
    catch(e) {
        console.log(e);
    }
    console.log();
    console.log("Fail test:");
    try{
        var gp1 = await people.getPersonById();
        console.log(gp1);
    }
    catch(e) {
        console.log(e);
    }
    console.log();

    console.log("lexIndex test");
    console.log();
    console.log("Pass test:");
    try {
        var gp2 = await people.lexIndex(2);
        console.log(gp2);
    }
    catch(e) {
        console.log(e);
    }
    console.log();
    console.log("Fail test:");
    try {
        var gp2 = await people.lexIndex(500);
        console.log(gp2);
    }
    catch(e) {
        console.log(e);
    }
    console.log();

    console.log("First Name Metrics test");
    console.log();
    try {
        var gp3 = await people.firstNameMetrics();
        console.log(gp3);
    }
    catch(e) {
        console.log(e);
    }
    console.log();

    console.log("Should they go outside test");
    console.log();
    console.log("Pass test:")
    try {
        var gp4 = await weather.shouldTheyGoOutside("Scotty", "Barajaz");
        console.log(gp4);
    }
    catch(e) {
        console.log(e);
    }
    console.log();
    console.log("Fail test:");
    try {
        var gp4 = await weather.shouldTheyGoOutside("KKK");
        console.log(gp4);
    }
    catch(e) {
        console.log(e);
    }
    console.log();

    console.log("Where do They Work test");
    console.log();
    console.log("Pass test:");
    try {
        var gp5 = await work.whereDoTheyWork("Demetra", "Durrand");
        console.log(gp5);
    }
    catch(e) {
        console.log(e);
    }
    console.log();
    console.log("Fail test:");
    try {
        var gp5 = await work.whereDoTheyWork();
        console.log(gp5);
    }
    catch(e) {
        console.log(e);
    }
    console.log();

    console.log("Find the hacker test");
    console.log();
    console.log("Pass test:");
    try {
        var gp6 = await work.findTheHacker("69.7.59.121");
        console.log(gp6);
    }
    catch(e) {
        console.log(e);
    }
    console.log();
    console.log("Fail test:");
    try {
        var gp6 = await work.findTheHacker("0.0.0.0");
        console.log(gp6);
    }
    catch(e) {
        console.log(e);
    }
    console.log();
}

main();