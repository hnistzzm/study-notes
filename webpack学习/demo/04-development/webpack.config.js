const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'./dist'),
        clean:true//每次打包都会清空dist目录内文件并重新生成
    },
    mode:'development',

    devtool:'inline-source-map',


    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'app.html',
            inject:'body'
        })
    ],

    devServer:{
        static:'./dist'
    }
}