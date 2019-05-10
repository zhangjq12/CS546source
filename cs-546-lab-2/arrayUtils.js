
var head = function head(arr) {
    if(!(arr instanceof Array)) 
        throw "not a Array";
    if(arr.length > 0)
        return arr[0];
    else
        throw "Array is empty";
}

var last = function last(arr) {
    if(!(arr instanceof Array))
        throw "not a Array";
    if(arr.length > 0)
        return(arr[arr.length - 1]);
    else
        throw "Array is empty";
}

var remove = function remove(arr,ind) {
    if(arr == undefined || ind == undefined)
        throw "lack of arguments";
    if(!(arr instanceof Array))
        throw "first argument is not a Array";
    if(typeof ind != 'number')
        throw "Index not in proper type";
    if(arr.length <= 0)
        throw "Array is empty";
    if(ind < 0 || ind > arr.length - 1)
        throw "Index is out of range";
    arr.splice(ind,1);
    return arr;
}

var range = function range(end, val = 0) {
    var arr = [];
    if(typeof end != 'number' || end <= 0 || end % 1 != 0) 
        throw "The end argument is in wrong format";
    if(typeof val != 'number')
        for(var i = 0; i < end; i++)
            arr.push(val);
    else
        for(var i = 0; i < end; i++) {
            arr.push(val);
            val++;
        }
    return arr;
}

var countElements = function countElements(arr) {
    if(!(arr instanceof Array))
        throw "not a Array";
    const obj = {};
    for(let x of arr) {
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

var isEqual = function isEqual(arr1, arr2) {
    if(arr1 == undefined || arr2 == undefined)
        throw "arguments can't be empty";
    if(!(arr1 instanceof Array) || !(arr2 instanceof Array))
        throw "not a Array";
    if(arr1.length != arr2.length)
        return false;
    if(arr1 == [] && arr2 == [])
        return true;
    for(var i = 0; i < arr1.length; i++)
        if(arr1[i] !== arr2[i])
            return false;
    return true;
}

module.exports = {
    head,
    last,
    remove,
    range,
    countElements,
    isEqual
}