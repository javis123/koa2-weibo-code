const Sequelize = require('sequelize')

const conf = {
  host : 'localhost',
  dialect : 'mysql'
}

const seq = new Sequelize('koa2_weibo_db', 'root', 'zk1996718',conf)

module.exports = seq