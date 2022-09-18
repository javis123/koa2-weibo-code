/**
 * @description utils controller
 * @author zk
 */

const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')

//头像默认存放路径
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
//文件最大体积 这里为1m
const MAX_SIZE = 1024 * 1024 * 1024
//检查是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if(!exist){
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})
/**
 * 保存文件
 * @param {string} name  文件名
 * @param {string} type 文件类型
 * @param {number} size 文件体积大小
 * @param {string} filePath 文件路径
 * @returns 
 */
async function saveFile({ name, type, size ,filePath }) {
  if(size > MAX_SIZE){
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }
  //移动文件
  const fileName = Date.now() + '.' + name
  const distFileName = path.join(DIST_FOLDER_PATH, fileName)
  await fse.move(filePath, distFileName)
  //返回数据
  return new SuccessModel({
    url: '/' + fileName
  })
}

module.exports = {
  saveFile
}