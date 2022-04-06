var isStraight = function(nums) {

    let map = new Map();

    map.set('A',1);
    map.set(2,2)
    map.set(3,3)
    map.set(4,4)
    map.set(5,5)
    map.set(6,6)
    map.set(7,7)
    map.set(8,8)
    map.set(9,9)
    map.set(10,10)
    map.set('J',11)
    map.set('Q',12)
    map.set('K',13)
    map.set(0,0)

    let kingArr = [];//用来存储大小王
    nums.sort((a,b) => a-b);

    while(nums[0] == 0){
        
        kingArr.push(nums.shift())
    }
    console.log(nums);
    for(let i=1;i<nums.length;i++){
        console.log('map',map.get(nums[i]));
        console.log('map',map.get(nums[i-1]));
        if(map.get(nums[i]) -1 != map.get(nums[i-1])){

            console.log("num",nums[i]);
            let diff = map.get(nums[i]) - map.get(nums[i-1]) -1;//获取两个不相隔数字的差
            
            while(kingArr.length){

                diff--;
                kingArr.pop();

            }
            if(diff != 0) return false;

        }

    }

    return true;



};
console.log(isStraight(['A',2,3,4,5]));