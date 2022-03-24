var removeDuplicates = function(nums) {

    let low = [];
    for(let i=0;i<nums.length;i++){
        if(nums[i] !== nums[i-1]) low.push(nums[i])
    }
    return low
};
let arr =[1,1,2]
console.log(removeDuplicates(arr)); 