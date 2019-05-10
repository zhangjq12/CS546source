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
    if(index < 0 || index > data.length - 1)
        throw "Index out of range";
    s = s + data[index - 1]["firstName"] + " " + data[index - 1]["lastName"];
    return s;
}

async function lexIndex(index) {
    const data = await init.getPerson();
    var s = "";
    if(typeof index != 'number' || index % 1 != 0)
        throw "Index is not the proper type";
    if(index < 0 || index > data.length - 1)
        throw "Index out of range";
    //for(let x in data)
    var arr = data.sort(compare("lastName"));
        //console.log(arr);
    s = s + arr[index]["firstName"] + " " + arr[index]["lastName"];
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
        if(l == "a" || l == "e" || l == "i" || l == "o" || l == "u" || l == "A" || l == "E" || l == "I" || l == "O" || l == "U")
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

module.exports = {
    getPersonById,
    lexIndex,
    firstNameMetrics,
}