const init = require('./initial.js');

async function whereDoTheyWork(firstName, lastName) {
    const person = await init.getPerson();
    const work = await init.getWork();
    if(typeof firstName != 'string' || typeof lastName != 'string')
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
    whereDoTheyWork,
    findTheHacker
}