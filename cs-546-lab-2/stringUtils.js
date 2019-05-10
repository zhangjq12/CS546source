var capitalize = function capitalize(str) {
    if(typeof str != 'string') 
        throw "not a string";
    return str.toLowerCase().replace(/\b[a-z]/g,function(s){return s.toUpperCase();});
}

var repeat = function repeat(str, num) {
    var st1 = "";
    if(typeof str != 'string') 
        throw "first argument is not a string";
    if(typeof num != 'number')
        throw "second argument is not a number";
    else
        if(num < 0 || num % 1 != 0)
            throw "the format of second argument is nor right";
        else
            for(var i = 0 ; i < num ; i ++)
                st1 = st1 + str;
    return st1;
}

var countChars = function countChars(str) {
    if(typeof str != 'string') 
        throw "not a string";
    const obj = {};
    for(let x of str) {
        boo = false;
        for(let y in obj)
            if(y == x.toString()) {
                obj[y] ++;
                boo = true;
            }
        if(!boo) {
            obj[x.toString()] = 1;
        }
    }
    return obj;
}

module.exports = {
    capitalize,
    repeat,
    countChars
}