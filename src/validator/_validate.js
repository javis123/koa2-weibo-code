/**
 * @description 公共校验方法
 */
const Ajv = require('ajv')
const ajv = new Ajv()

/**
 * 
 * @param {Object} shcema json shcema 规则
 * @param {Object} data 待校验的数据
 * @returns 
 */
function validate(schema,data={}){
  const validate1 = ajv.compile(schema)
  const valid = validate1(data)
  if(!valid){
    return validate1.errors[0]
  }
}

module.exports = validate