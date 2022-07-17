const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')
const { host, user, password, database } = MYSQL_CONF
const conf = {
  host,
  dialect : 'mysql'
}
//取消日志打印
if(isTest){
  conf.logging = () => {}
}

if(isProd){
  conf.pool = {
    max : 5,
    min : 0,
    idle : 10000
  }
}
const seq = new Sequelize(database, user, password, conf)
module.exports = seq