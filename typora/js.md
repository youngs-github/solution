# 1、语法基础

### 1.1、编译

##### 1.1.1、编译阶段

1、分词/词法解析：将字符串分割为有意义的代码块（词法单元）；
2、解析/语法分析：将词法单元转换成抽象语法树（ast）；

##### 1.1.2、编译特点

1、语法分析及生产阶段优化：去除冗余元素，提高执行效率；
2、编译过程优化：如JIT及延迟编译、重编译等；

### 1.2、作用域链

##### 1.2.1、VO

##### 1.2.2、AO

### 1.3、浮点数

##### 1.3.1、表示

1、符号位：S，长度为1，0表示正数，1表示负数；
2、指数位：E，长度为11，基准数-1023；
3、尾数位：M，长度为52，超出时自动进一舍零，缺少时自动补零，二进制整数存储时均省略整数部分1，故该位有53位；
4、表达式：V=（-1）^S * 2 ^ （E - 1023） * （M + 1）；

##### 1.3.2、精度处理

1、toFixed：先将数字取精度后，再有parseFloat转成数字；
2、转成整数：先乘整数变成整数，进行计算后再取小数；
3、字符串处理：利用字符串运算；

### 1.4、类型转换

##### 1.4.1、==

1、null==undefined：返回true；
2、存在number：将其他转为number再比较；
3、存在boolean：将boolean转为number再比较；
4、存在object：将object转为基础类型再比较；

##### 1.4.2、toNumber

1、undefined：NaN;
2、null：0；
3、boolean：true=1、false=0；
4、string：能解析就解析，不能就NaN；

### 1.5、var、let、const

1、没有变量提升：var存在提升（创建、初始化），let/const仅创建提升（暂时性死区，不允许使用），function也存在提升（创建、初始化、赋值）；
2、分配内存地址：var会在栈区预分配内存地址（执行时再存储对应变量或者变量地址），let/const不会预分配内存地址（且会检测是否已经存在，存在则报错）；

# 2、相关知识

### 2.1、event loop

1、宏（外部）队列：macrotask queue，包括：DOM操作、用户交互、网络请求、history操作、定时器、script标签、requestAnimationFrame、MessageChannel等；

2、微（内部）队列：microtask queue，包括：Promise、process.nextTick、MutationObserver、Object.observe（已废弃）；

3、调度过程：每次从宏任务队列取出一个任务，执行完毕之后执行微任务队列（全部），执行浏览器渲染任务，循环往复；

### 2.2、继承

1、原型链：将父类实例绑定到子类原型链上；
2、借用构造函数：子类构造函数中借用父类构造函数；
3、组合式：使用1、2两点，并将constructor指向子类；
4、原型式：利用空对象作为媒介，new F()，F的原型链指向被继承对象；
5、寄生式：使用第4点，同时将原型方法、属性挂载到实例上；
6、寄生组合式：使用第4点，create父类原型的子元素，将constructor指向子类，并赋值给子类原型，new 时借用父类构造函数；

### 2.3、模块化发展

1、iife：立即执行函数，单独作用域，避免变量冲突；
2、amd：requireJS，依赖必须提前声明好，后面支持延迟加载；
3、cmd：seaJS，强调延迟加载，支持动态引入依赖文件；
4、commonJS：nodejs，动态引入、浅拷贝、缓存（解决循环依赖，默认空对象）；
5、umd：兼容amd、cmd、commonJS语法；
6、es module：静态依赖，静态只读引用，等运行时再去依赖里面取出实际需要的值；

### 2.4、ES模块

##### 2.4.1、es6

1、let、const；
2、字符串扩展：模板字符串、includes、startsWith、endsWith；
3、解构表达式；
4、函数：参数默认值、箭头函数、对象函数简写；
5、数组：map、reduce；
6、对象：对象属性简写；
7、扩展运算符：多用于数组、类数组、对象；
8、promise；
9、set/map；
10、class语法；
11、generator：yield、for of遍历；
12、模块化；

##### 2.4.2、es7

1、数组：includes；
2、指数：2**3；

##### 2.4.3、es8

1、async、await；
2、Object.entries/values：补充Object.keys；
3、字符串扩展：padStart、padEnd，填充使用，长度+string；
4、SharedArrayBuffer、Atomic；

##### 2.4.4、es9

1、异步迭代：await + for；
2、Promise.finally；
3、rest/spread属性：fn(arg1, arg2, ...args)；
4、正则表达式补充；

##### 2.4.5、es10

1、JSON.stringify优化；
2、flat、flatMap；
3、字符串trimStart、trimEnd；
4、Object.fromEntries；
5、Symbol.prototype.description：symbol的描述信息；
6、基本类型：BigInt；

### 2.5、箭头函数

1、this：箭头函数没有自己的this，因此使用call、bind、apply方法无法更改其this指向；
2、arguments：箭头函数不绑定arguments属性，可以使用rest参数；
3、prototype：箭头函数没有prototype，也就没有继承的super；
4、new：箭头函数不能使用new命令，也就没有new.target；
5、generator：箭头函数不能使用yield命令，不能做generator函数；