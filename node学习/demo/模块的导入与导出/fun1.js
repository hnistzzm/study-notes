


exports.fun2 = function(){
    return 'fun2'
}

exports.fun1 = function(){
    const fun2 = fun2()
    console.log("fun2",fun2);
    return 'fun1'+fun2
}

