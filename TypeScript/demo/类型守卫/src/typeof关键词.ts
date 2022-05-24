
function padLeft(value: string,padding: number | string){

    if(typeof padding === 'number'){
        return Array(padding + 1).join("*") + value;
    }
    if(typeof padding === 'string'){
        return padding + value;
    }

    throw new Error(`Expected string or number, got '${padding}'.`);
}

console.log(padLeft('hello',5));
