const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd } = require('../utils/env')
const { host, user, password, database } = MYSQL_CONF
const conf = {
  host,
  dialect : 'mysql'
}

if(isProd){
  conf.pool
}
const seq = new Sequelize(database, user, password, conf)

module.exports = seq