var extend = function extend(...args) {
    if(args.length < 2)
        throw "not the right format";
    for(let elem of args)
        if(typeof elem != 'object')
            throw "not an object";
    var obj = {};
    for(let x of args)
        for(let y in x) {
            var boo = true;
            for(let z in obj)
                if(y == z)
                    boo = false;
            if(boo)
                obj[y] = x[y];
        }
    return obj;
}

var smush = function smush(...args) {
    if(args.length < 2)
        throw "not the right format";
    for(let elem of args)
        if(typeof elem != 'object')
            throw "not an object";
    var obj = {};
    for(let x of args)
        for(let y in x) {
            obj[y] = x[y];
        }
    return obj;
}

var mapValues = function mapValues(obj, func) {
    if(typeof obj != 'object')
        throw "not an object";
    if(typeof func != 'function') 
        throw "there is no function";
    for(let x in obj) {
        obj[x] = func(obj[x]);
    }
    return obj;
}

module.exports = {
    extend,
    smush,
    mapValues
}