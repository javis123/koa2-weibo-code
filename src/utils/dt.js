/**
 * @description 时间标准化工具
 * @author zk
 */

const { format } = require('date-fns')

function timeFormat(str) {
  return format(new Date(str),'MM.dd HH:mm')
}

module.exports = timeFormat