

// split方法
// let str = '1a2b3c4d5e6f'
// console.log(str.split(/[A-Z]/i));

// search方法
// let str1 = 'abb hello acc abc'
// console.log(str1.search(/a[A-Z]c/i));

//match方法
// let str2 = `1a2b3c4d5e6f7G`
// console.log(str2.match(/[a-z]/gi));

//replace方法
// let str3 = `abcABC12345678abc`
// console.log(str3.replace(/abc/g,"=_="));

//量词
// const reg = /a{3}/
// console.log(reg.test("aabc"));//false
// console.log(reg.test("aaabc"));//true

// const reg1 = /ab{3}/
// console.log(reg1.test("ababab"));//false
// console.log(reg1.test("abbb"));//true

// const reg2 = /(ab){3}/
// console.log(reg2.test("ababab"));//true
// console.log(reg2.test("abbb"));//false
// let reg3 = /ab?a/
// console.log(reg3.test('abba'))//true

const reg = /^1[3-9][0-9]{9}$/
console.log(reg.test('17261390609'));