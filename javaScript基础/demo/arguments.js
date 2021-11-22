

function fun(){
    console.log(this);
    console.log(arguments);
    console.log(arguments.length);
    console.log(arguments.callee);
}
fun(1,2)