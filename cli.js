#!/usr/bin/env node
const program = require('commander')
const api = require('./index.js')
const pkg = require('./package.json')
program
  .version(pkg.version)
// 子选项  -> 添加任务
program
  .command('add')
  .description('add a task')
  .action((...args) => {
    // 因为最后一个参数是 个对象， 我们不需要的
    const words = args.slice(0, -1).join(' ')
    api.add(words).then(() => { console.log('添加成功')}, () => {console.log('添加失败')} )
  })

// 子选项 -> 清除所有任务
program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
    api.clear().then(() => { console.log('已经清除完毕')}, () => {console.log('清除失败')} )
  })


program.parse(process.argv)

// 我们需要直接 node 该 js 需要显示所有任务
//但是 process.argv  默认会有俩个路径参数
if(process.argv.length === 2){
  void api.showAll()
}
