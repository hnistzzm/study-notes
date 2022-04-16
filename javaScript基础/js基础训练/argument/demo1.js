

function fun(a,b){

    console.log(a);
    console.log(arguments.length);
    arguments[0] = 2;
    console.log(a);
}

fun(1,2)