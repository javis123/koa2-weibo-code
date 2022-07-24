
const { Blog } = require('../db/model/index')

async function createBlog({ userId, content, image }) {
  const result = Blog.create({
    userId,
    content,
    image
  })
  return result.dataVaules
}

module.exports = {
  createBlog
}