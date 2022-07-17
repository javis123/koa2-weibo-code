/**
 * @description sequelize同步
 * @author zk
 */
const seq = require('sequelize')

seq.authenticate().then(res => {
  console.log('auth ok')
}).then(err => {
  console.log('auth err')
})

seq.sync({ force : true }).then(() => {
  console.log('ok')
  process.exit()
})