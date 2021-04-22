/**
 * 原型式继承
 */
function inherit(target) {
  // 可以替代
  // return Object.create(target);
  function F() {}
  F.prototype = target;
  return new F();
}
