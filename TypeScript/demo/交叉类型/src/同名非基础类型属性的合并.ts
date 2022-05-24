
interface D { d: boolean; }
interface E { e: string; }
interface F { f: number; }

interface A { x: D; }
interface B { x: E; }
interface C { x: F; }

type ABC = A & B & C;

let abc: ABC = {
    x:{
        d:true,
        e:'sem',
        f:66
    }
}

console.log("abc",abc);
