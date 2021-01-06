const fs = jest.genMockFromModule('fs')  // 制造假的fs模块
const _fs = jest.requireActual('fs')  // 获取真的fs模块

Object.assign(fs, _fs)  // 将真fs模块的所有内容复制给 假的fs

let readMocks = {}
fs.setReadFileMock = (path, error, data) => {
  readMocks[path] = [error, data]   // 将error，data 放在 readMocks.path 中
}

fs.readFile = (path, options, callback) => {
  // fs.readFile('/xxx',fn)
  // 如果用户只传俩个参数， 那么就吧 callback 当作第二个参数
  if(callback === undefined){ callback = options}
  if(path in readMocks){
    callback(...readMocks[path])
  }else{
    _fs.readFile(path,options,callback)
  }
}



let writeMocks = {}
fs.setWriteFileMock = (path,fn)=>{
  writeMocks[path] = fn
}

fs.writeFile = (path,data,options,callback) => {
  if(path in writeMocks){
    writeMocks[path](path,data,options,callback)
  }else{
    _fs.writeFile(path,data,options,callback)
  }
}

fs.clearMocks = ()=>{
  readMocks = {}
  writeMocks = {}
}
module.exports = fs