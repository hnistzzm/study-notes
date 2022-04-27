
function * helloGenerator(){

    console.log("hello");
    yield 'hello';
    console.log('world');
    yield 'world';
    console.log("end");
    return 'end';

}

let newGenerator = helloGenerator();

console.log(newGenerator);
console.log(newGenerator.next());
console.log(newGenerator.next());
console.log(newGenerator.next());
console.log(newGenerator.next());