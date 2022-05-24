"use strict";
//never 类型表示的是那些永不存在的值的类型
//例如，never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。
function error(message) {
    throw new Error(message);
}
error('abc');
