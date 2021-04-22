/**
 * 寄生组合式继承
 */
function inherit(Parent, Child) {
  Child.prototype = create(Parent);
  Child.prototype.constructor = Child;
}

function create(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}

function Father(name) {
  this.name = name;
}
function Child(name, address) {
  Father.call(this, name);
  this.address = address;
}
Child.prototype.getName = function () {
  return this.name;
};
