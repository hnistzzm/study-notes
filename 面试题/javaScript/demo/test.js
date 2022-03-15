var majorityElement = function(nums) {
   
    nums.sort((a,b)=>{
        return a-b;
    })
    return nums[parseInt((3/2)) ];
 };
 console.log(majorityElement([1,2,3])); 