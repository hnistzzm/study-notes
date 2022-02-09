
//实现思路：用一个数组存储每一个遍历过的对象，下次找到数组中存在，则说明环引用
function cycleDetector(obj){

    const cache = [obj];
    let flag = false;

    function cycle(o){
        const keys = Object.keys(o);

        for (const key of keys) {
            const temp = o[key]
            if( typeof temp === 'object' && temp !== null){
                if(cache.indexOf(temp) >= 0){
                    flag = true;
                    return;
                }
                cache.push(temp);
                cycle(temp);
            }
        }
    }
    

    cycle(obj);
    return flag;
}


const obj = {
    a: {
        c: [
            1, 2
        ]
    },
    b: 1
}

obj.a.c.d = obj
console.log(cycleDetector(obj)) // true