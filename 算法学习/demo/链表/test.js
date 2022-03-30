var missingNumber = function(nums) {
    

    for(let i = 0;i<=nums.length;i++){
        console.log(`i=${i}--num[i]=${nums[i]}`);
        if(nums[i] !== i){
            return i;
        }

    }

    
    
};
console.log(missingNumber([0,1,2,3,4])); 