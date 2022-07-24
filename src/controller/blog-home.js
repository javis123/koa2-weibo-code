/**
 * @description blog control
 * @author zk
 */

const xss = require('xss')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog } = require('../services/blog')
const { createBlogFailInfo } = require('../model/ErrorInfo')

async function create({ userId, content, image }) {
  try{
    const result = await createBlog({ userId, content: xss(content), image })
    return new SuccessModel(result)
  }catch(ex){
    console.error(ex.error, ex.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create
}