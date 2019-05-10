const init = require('./initial.js');

function compare(property) {
    return function(a, b){ 
        var v1 = a[property];
        var v2 = b[property];
        if(v1 > v2)
            return 1;
        else
        if(v1 < v2)
            return -1;
        else
            return 0;
    }
}

async function getPersonById(index) {
    const data = await init.getPerson();
    var s = "";
    if(typeof index != 'number' || index % 1 != 0)
        throw "Index is not the proper type";
    if(index < 0 || index > data.length)
        throw "Index out of range";
    for(let x in data)
        if(x == index)
            s = s + data[x]["firstName"] + " " + data[x]["lastName"];
    return s;
}

async function lexIndex(index) {
    const data = await init.getPerson();
    var s = "";
    if(typeof index != 'number' || index % 1 != 0)
        throw "Index is not the proper type";
    if(index < 0 || index > data.length)
        throw "Index out of range";
    //for(let x in data)
    var arr = data.sort(compare("lastName"));
        //console.log(arr);
    for(let x in arr)
        if(x == index)
            s = s + arr[x]["firstName"] + " " + arr[x]["lastName"];
    return s;
}

async function firstNameMetrics() {
    const data = await init.getPerson();
    var letter = 0;
    var vowel = 0;
    var consonant = 0;
    var longest = "";
    var long = 0;
    var shortest = "";
    var short = 1000000000;
    for(let x in data){
        letter += data[x]["firstName"].length;
        for(let l of data[x]["firstName"])
            if(l == "a" || l == "e" || l == "i" || l == "o" || l == "u")
                vowel ++;
        if(data[x]["firstName"].length > long) {
            longest = data[x]["firstName"];
            long = data[x]["firstName"].length;
        }
        if(data[x]["firstName"].length < short) {
            short = data[x]["firstName"].length;
            shortest = data[x]["firstName"];
        }
    }
    consonant = letter - vowel;
    var obj = new Object();
    obj["totalLetters"] = letter;
    obj["totalVowels"] = vowel;
    obj["totalConsonants"] = consonant;
    obj["longestName"] = longest;
    obj["shortestName"] = shortest;
    return obj;
}

async function shouldTheyGoOutside(firstName, lastName) {
    const person = await init.getPerson();
    const weather = await init.getWeather();
    if(firstName == undefined || lastName == undefined)
        throw "The parameters couldn't be of the proper type";
    var boo = false;
    var zip = "";
    for(let x in person)
        if(person[x]["firstName"] == firstName && person[x]["lastName"] == lastName) {
            boo = true;
            zip += person[x]["zip"];
        }
    if(boo)
        for(let x in weather)
            if(zip == weather[x]["zip"])
                if(parseInt(weather[x]["temp"]) >= 34)
                    return "Yes, " + firstName + " should go outside";
                else
                    return "No, " + firstName + " should not go outside";
    if(!boo)
        throw "There is no such a person";
}

async function whereDoTheyWork(firstName, lastName) {
    const person = await init.getPerson();
    const work = await init.getWork();
    if(firstName == undefined || lastName == undefined)
        throw "The parameters couldn't be of the proper type";
    var boo = false;
    var ssn = "";
    for(let x in person)
        if(person[x]["firstName"] == firstName && person[x]["lastName"] == lastName) {
            boo = true;
            ssn += person[x]["ssn"];
        }
    if(!boo)
        throw "There is no such a person";
    else
        for(let x in work)
            if(work[x]["ssn"] == ssn)
                if(work[x]["willBeFired"] == "true")
                    return firstName + lastName + " - " + work[x]["jobTitle"] + " at " + work[x]["company"] + ". They will be fired.";
                else
                    return firstName + lastName + " - " + work[x]["jobTitle"] + " at " + work[x]["company"] + ". They will not be fired.";
}

async function findTheHacker(ip) {
    const person = await init.getPerson();
    const work = await init.getWork();
    const exp = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
    const judge = exp.test(ip);
    if(!judge)
        throw "The ip address is invalid";
    if(ip == undefined)
        throw "The ip address can't be empty";
    var ssn = "";
    for(let x in work)
        if(work[x]["ip"] == ip) {
            ssn += work[x]["ssn"];
        }
    for(let x in person)
        if(person[x]["ssn"] == ssn)
            return person[x]["firstName"] + " " + person[x]["lastName"] + " is the hacker!";
        else
            return "Can't find the hacker :-(";
}

module.exports = {
    getPersonById,
    lexIndex,
    firstNameMetrics,
    shouldTheyGoOutside,
    whereDoTheyWork,
    findTheHacker
}