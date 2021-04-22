/**
 * 寄生式继承
 */
function inherit(target) {
  // 可以用Object.create替代
  function F() {}
  F.prototype = target;
  return new F();
}

// 增强
function createEnhance() {
  const clone = inherit({ name: 'parent' });
  clone.getName = function () {
    return this.name;
  };
  return clone;
}
