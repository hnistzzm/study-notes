

function loopGetLevel(obj){

    let res = 1;

    function computedLevel(o,level){
        
        var level = level ? level : 0;

        if(typeof o === 'object'){
            for (var key in o) { 
                
                if (typeof o[key] === 'object') {

                    computedLevel(o[key], level + 1);
                }else{

                    res = level + 1 > res ? level + 1 : res;
                }
            }                                                                                  
        }else{
            res = level > res ? level : res;
        }
       

    }
    computedLevel(obj);

    return res;
    
} 

const obj = {
    a: { b: [1] },
    c: { d: { e: { f: 1 } } }
}

console.log(loopGetLevel(obj)) // 4