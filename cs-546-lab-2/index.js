const arrayU = require("./arrayUtils.js");
const stringU = require("./stringUtils.js");
const objU = require("./objUtils.js");

// Range Tests
console.log("Testing Range function in ArrayUtils:");
console.log();
try {
    // Should Pass
    const rangeOne = arrayU.isEqual([1,2,3],[1,'2',3]);
    console.log(rangeOne);
    console.log('Range passed successfully');
} catch (e) {
    console.error('Range failed test case');
}
console.log();
try {
    // Should Fail
    const rangeTwo = arrayU.remove([1,2,3],"123");
    console.log(rangeTwo);
    console.error('Range did not error');
} catch (e) {
    console.log(e);
    console.log('Range failed successfully');
}
console.log();

// Map Values Tests
console.log("Testing Map Values function in ObjUtils:");
console.log();
try {
    // Should Pass
    const map1 = objU.mapValues({a:1, b:2, c:3}, n => n + 1);
    console.log(map1);
    console.log('Map values passed successfully');
} catch (e) {
    console.log(e);
    console.error('Map Values failed test case');
}
console.log();
try {
    // Should Fail
    const map2 = objU.mapValues(15, 12);
    console.log(map2);
    console.log('Map values did not error');
} catch (e) {
    console.log(e);
    console.error('Map Values failed successfully');
}
console.log();

// Extend method Tests
console.log("Testing Extend function in ObjUtils:");
console.log();
try {
    // Should Pass
    const  ex1 = objU.extend({x:2, y:3}, {a:70, x:4, z:5}, {x: 0, y: 9, q: 10});
    console.log(ex1);
    console.log('Extend passed successfully');
} catch (e) {
    console.log(e);
    console.error('Extend failed test case');
}
console.log();
try {
    // Should Fail
    const ex2 = objU.extend({a:15, b:12});
    console.log(ex2);
    console.log('Extend did not error');
} catch (e) {
    console.log(e);
    console.error('Extend failed successfully');
}
console.log();

// Repeat Tests
console.log("Testing Repeat function in StringUtils:");
console.log();
try {
    // Should Pass
    const repeatOne = stringU.repeat("High",4);
    console.log(repeatOne);
    console.log('Repeat passed successfully');
} catch (e) {
    console.error('Repeat failed test case');
}
console.log();
try {
    // Should Fail
    const repeatTwo = stringU.repeat('1234','12');
    console.log(repeatTwo);
    console.error('Repeat did not error');
} catch (e) {
    console.log(e);
    console.log('Repeat failed successfully');
}
console.log();