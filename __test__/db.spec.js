const db = require('../db.js')
const fs = require('fs')
jest.mock('fs')

describe('db',()=>{
  afterEach(()=>{
    fs.clearMocks()
  })
  it('can read file',async ()=>{
    const data = [{title:'hi',done:true}]
    fs.setReadFileMock('/xxx',null,JSON.stringify(data))
    const list = await db.read('/xxx')
    expect(list).toStrictEqual(data)   // toStrictEqual  字符意义上 俩个空数组是相等的
  })

  it('can write file',async ()=>{
    let fakeFile
    fs.setWriteFileMock('/yyy',(path,data,callback)=>{
      fakeFile = data
      callback(null)
    })
    const list = [{title:'学HTML',done: true},{title: '学CSS',done: true}]
    await db.write(list,'/yyy')
    expect(fakeFile).toBe(JSON.stringify(list)+'\n')
  })
})