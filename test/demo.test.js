/**
 * @description test demo
 * @author zk
 */
function sum(a, b){
  return a + b
}
test('10 + 20等于30吗',() => {
  expect(sum(10,20)).toBe(30)
})