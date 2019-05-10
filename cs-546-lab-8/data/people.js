const init = require('./initial.js');

async function getPersonById(index) {
    const data = await init.getPerson();
    if(typeof index != 'number' || index % 1 != 0)
        throw "Index is not the proper type";
    if(index <= 0 || index > data.length)
        throw "Index out of range";
    const s = data[index - 1];
    return s;
}

async function getAllPosts() {
    const data = await init.getPerson();
    return data;
}

async function getByName(name) {
    const data = await init.getPerson();
    if(typeof name != 'string')
        throw "name is wrong format";
    name1 = name.toLowerCase();
    var result = [];
    for(var i = 0; i < data.length; i++) {
        var obj = new Object();
        var s = "";
        s = s + data[i]["firstName"] + " " + data[i]["lastName"];
        s1 = s.toLowerCase();
        var boo = false;
        for(var j = 0; j < s1.length - name1.length; j++) {
            if(s1.substring(j, j + name1.length) == name1) {
                obj["id"] = data[i]["id"];
                obj["name"] = s;
                boo = true;
                break;
            }
        }
        if(boo) {
            result.push(obj);
        }
        if(result.length >= 20) {
            break;
        }
    }
    return result;
}

module.exports = {
    getPersonById,
    getAllPosts,
    getByName
}