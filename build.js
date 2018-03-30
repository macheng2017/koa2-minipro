require('shelljs/global')
 // 引入系统命令,对文件进行删除

const webpack = require('webpack')
const fs = require('fs')
const _ = require('lodash')// 提供一些工具函数
const { resolve } = require('path')

// 找到build 运行脚本的工作目录的路径
const r = url => resolve(process.cwd(), url)
const webpackConf = require('./webpack.config')
//拿到需要部署的文件夹的目录 
//把编译后的所有文件都放到mina中

const assetsPath = r('./mina') 

// 找到所有的pages文件
const config = require(r('./mina-fonig'))
//删除旧文件,生成新文件夹
rm('-rf', assetsPath)
mkdir(assetsPath)

var renderConf = webpackConf
// 指定入口文件 
// 使用工具遍历
renderConf.entry = () => _.reduce(config.json.pages, (en, i)=>{
    en[i] = resolve(process.cwd(), './', '${i}.mina')
    return entry
})

renderConf.entry = entry()
renderConf.entry.app = config.app
//output
renderConf.output = {
    path: r('./mina'),
    filename: '[name].js'
}

var compiler = webpack(renderConf)  //编译器

fs.writeFileSync(r('./mina/app.json'), JSON.stringify(config.json), 'utf8')

compiler.watch({
    aggregateTimeout: 300,
    poll: true
}, (err, stats) => {
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: true,
        chunks: true,
        chunkModules: true
    }) + '\n\n')
}) // 监听整个文件的变化