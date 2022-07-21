/**
 * @description jest server
 * @author zk
 */

const request = require('supertest')
const server = require('../src/app').callback()
module.exports = request(server)