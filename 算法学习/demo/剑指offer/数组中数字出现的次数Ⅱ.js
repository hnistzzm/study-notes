var singleNumbers = function(nums) {

    
    let q = 0;

    for(let num of nums){

        q ^= num;//遍历完后r的值为两个只出现一次的数x,y的异或值,即x^y

    }

    //x和y是不相等的,这意味着x和y的二进制数中至少有一位是不相等的
    //而&运算的逻辑是[同1为1],我们设置m初始值为1,则它的二进制表示为0001
    //通过m&(x^y),我们可以求出x与y中不相等的二进制位,如0100,我们设为mark
    //再让nums中每一项与mark进行&运算,值为1的可以分为一个组,值为0的可以分为1个组
    //此时这两个子数组中,相同的数字必定在一个组,而两个只出现一次的数字也必定在不同组中
    //将这两个子数组进行异或运算,就可以求出两个结果值

    let m = 1;

    while((q & m) == 0){

        m = m<<1;
    }
    


    let x=0,y=0;

    for(let num of nums){

        if(num & m ){

            x ^= num;

        }else{

            y ^= num;
        }


    }

    return [x,y]


};

console.log(singleNumbers([1,2,10,4,1,4,3,3]));
