
function add(a,b){

    while(b != 0) { // 当进位为 0 时跳出
        let c = (a & b) << 1;  // c = 进位
        
        a ^= b; // a = 非进位和
        b = c; // b = 进位

        console.log("a",a);
        console.log("b",b);
        console.log("c",c);
    }
    return a;


}

console.log(add(2,3));