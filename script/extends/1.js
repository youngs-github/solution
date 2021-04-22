/**
 * 原型链继承
 */
function Parent() {
  this.level = 0;
}
function Child(name, address) {
  this.name = name;
  this.address = address;
}

function inherit(Child, Parent) {
  Child.prototype = new Parent();
  Child.prototype.constructor = Child;
}
inherit(Child, Parent);

Child.prototype.getName = function () {
  return this.name;
};
Child.prototype.getAddress = function () {
  return this.address;
};
