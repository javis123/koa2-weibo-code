/**
 * @description sequelize同步
 * @author zkd
 */
const seq = require('./seq')
require('./model/index')

seq.authenticate().then(res => {
  console.log('auth ok')
}).catch(err => {
  console.log('auth err')
})

seq.sync({ force : true }).then(() => {
  console.log('ok')
  process.exit()
})