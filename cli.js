#!/usr/bin/env node
 // NODE CLI 应用入口文件必须要有这样的文件名
// console.log('cli,working~~~')  //测试

/**
 * 脚手架的工作流程
 * 1、通过命令行交互询问用户问题
 * 2、根据用户回答的结果生成文件
 */
const path = require('path')
const inquirer = require('inquirer')
const fs = require('fs')
const ejs = require('ejs')

inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: 'Project name?'
}]).then(anwsers => {
    //  console.log(anwsers)  // { name: 'myName' }
    // 根据用户回答的结果生成文件

    //模板目录
    const temDir = path.join(__dirname, 'templates')
        //目标目录
    const destDir = process.cwd()
    fs.readdir(temDir, (err, files) => {
        if (err) throw err
        files.forEach(file => {
            // console.log(file)
            //通过模板引擎渲染文件
            ejs.renderFile(path.join(temDir, file), anwsers, (err, result) => {
                if (err) throw err
                fs.writeFileSync(path.join(destDir, file), result)
            })
        });
    })
})