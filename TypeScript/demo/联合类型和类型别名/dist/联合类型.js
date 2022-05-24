"use strict";
const sayHello = (name) => {
    if (typeof name === 'string') {
        console.log("hello", name);
    }
    else {
        console.log("hello!undefined先生");
    }
};
sayHello(undefined);
