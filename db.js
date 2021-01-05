const homedir = require('os').homedir()   // 系统中的 home目录
const home = process.env.HOME || homedir  // 自己在环境变量中设置的home（我没有设置。所以是 homedir）

const fs = require('fs')
const path = require('path')
const dbPath = path.join(home, '.todo')

const db = {
  read(path = dbPath) {
    // a+ 表示 能读也能加，如果没有此文件则会自动创建
    return new Promise((resolve, reject) => {
      fs.readFile(path, {flag: 'a+'}, (error, data) => {
        if (error) {return reject(error) }
        let list
        try {
          list = JSON.parse(data.toString())
        } catch (error2) {
          list = []
        }
        resolve(list)

      })
    })
  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list)
      fs.writeFile(path, string + '\n', (error) => {
        if (error) {return  reject(error)}
        resolve()
      })
    })
  }
}

module.exports = db