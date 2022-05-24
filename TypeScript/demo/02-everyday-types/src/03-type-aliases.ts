

type Point = { x: number; y: number} | string;

function printName(pt: Point): void {

    console.log(pt);
    

}

printName({
    x:1,
    y:2
})