/**
 * @param {string} str
 * @return {number}
 */
 var strToInt = function(str) {

    str = str.trim();//去除首尾空格

    if(!str.length){//如果字符串长度为0
        return 0;
    }

    if(str[0] === '-' || str[0] === '+' || (str[0]-'0' >= 0 && str[0]-'0' <= 9) ){//如果第一位符合条件

        let i = 1;

        while(i < str.length){
            
    
            if(str[i]< '0' || str[i] > '9'){//如果不在0-9范围内
                
                break;

            }
            i++;

        }

        const res = str.slice(0,i);

        if((res[0] === '+' || res[0] === '-') && res.length === 1){
            // res = res.slice(1)
            return 0;
        }

        if(res > Math.pow(2,31)-1){
            return (Math.pow(2,31)-1)
        }else if (res < Math.pow(-2,31)){
            return  Math.pow(-2,31)
        }else{
            return res
        }

  


    }else{//如果第一位数不符合条件

        return 0;

    }



};
