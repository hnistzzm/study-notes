/**
 * @param {string} s
 * @return {boolean}
 */
 var isNumber = function(s) {

    s = s.trim();

    if(!s.length) return false;

    // console.log(s.split());
    let eindex = s.split('').findIndex(item => item === 'e');
    let Eindex = s.split('').findIndex(item => item === 'E');

    console.log("eindex:" + eindex);
    console.log("Eindex:"+ Eindex);
    let isE;
    if(eindex !== -1 && Eindex !== -1){//如果同时含有'e'和'E'
        return false
    }else if(eindex === -1 && Eindex === -1){//如果都不存在
       
        console.log("不存在e或者E");
        if(iszheng(s) || isxiao(s)){
            return true;
        }
        return false;
    }else if (eindex === -1 && Eindex !== -1) {
       isE = true; 
    }else{
        isE = false;
    }
    console.log("isE: " + isE);
    let arr;
    if(isE){
         arr = s.split('E')

    }else{
         arr = s.split('e')
    }
    console.log("arr: " + arr);
    if(arr.length !== 2){//如果不止一个'e'或者'E'
       
        return false;
    }

    if((isxiao(arr[0]) || iszheng(arr[0])) && iszheng(arr[1])){
        return true;
    }

    return false;


};

function iszheng(str){//判断是否为整数
    console.log("判断整数",str);
    if( str[0] !== '+' && str[0] !== '-' && (str[0] < '0' || str[0] > '9')){
        console.log("不是整数");
        return false;
    }

    if(str[0] === '+' || str[0] === '-'){

        if(str.length === 1){
            return false;
        }
        let index = 1;

        while(index < str.length){
            if(str[index] < '0' || str[index] > '9') break;
            index++;
        }
        console.log("index: " + index);
        return index === str.length ? true : false;

    }else{

        if(!str.length) return false;

        let index = 0;

        while(index < str.length){
            if(str[index] < '0' || str[index] > '9') break;
            index++;
        }
        console.log("index: " + index);
        return index === str.length ? true : false;
    }

}
function isxiao(str){//判断是否为小数
    console.log("判断小数");
    if( str[0] !== '+' && str[0] !== '-' && str[0] !== '.' && (str[0] < '0' || str[0] > '9')){
        console.log("不是小数");
        return false;
    }


    if(str[0] === '+' || str[0] === '-'){
        str = str.slice(1)
    }

    if(str.length < 2) return false;//如果长度小于2

    let arr = str.split('.');
    console.log("Arr"+arr);
    if(arr.length !== 2) return false; //如果不止一个小数点或不足一个小数点 返回false

    let left = arr[0];
    let right = arr[1];


    if(!left.length && !right.length) return false
   

    for(let i =0 ;i<left.length ;i++){
        if((left[i] <'0' || left[i] >'9') && left[i] !== '') return false;
    }

    for(let i =0 ;i<right.length ;i++){
        console.log("i",right[i]);
        // console.log(right[i] === '');
        if((right[i] <'0' || right[i] >'9') && right[i] !== ''){
            // console.log(right[i] === '');
    
            return false;
        } 
    }

    console.log("是小数",str);
    return true;

}

console.log(isNumber("-.1"));