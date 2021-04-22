/**
 * 组合式继承
 */
function Parent(name) {
  this.name = name;
}
function Child(name, address) {
  Parent.call(this, name);
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
