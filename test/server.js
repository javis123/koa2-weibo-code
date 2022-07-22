/**
 * @description jest server
 * @author zk
 */
const request = require('supertest')
const server = require('../src/app')

module.exports = request(server)