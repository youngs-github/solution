/**
 * 借用构造函数继承
 */
function Parent(name) {
  this.name = name;
}
function Child(name, address) {
  Parent.call(this, name);
  this.address = address;
}

Child.prototype.getName = function () {
  return this.name;
};
Child.prototype.getAddress = function () {
  return this.address;
};
