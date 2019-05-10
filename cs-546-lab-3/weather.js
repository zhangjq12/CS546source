const init = require('./initial.js');

async function shouldTheyGoOutside(firstName, lastName) {
    const person = await init.getPerson();
    const weather = await init.getWeather();
    if(typeof firstName != 'string' || typeof lastName != 'string')
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

module.exports = {
    shouldTheyGoOutside
}