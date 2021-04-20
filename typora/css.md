# 1、基础

### 1.1、属性

可就太多了；

### 1.2、选择器

##### 1.2.1、选择器优先级

1、！important；
2、内联style；
3、#id选择器；
4、类选择器、属性选择器、伪类选择器（.classname[attr='']:active）；
5、元素选择器、关系选择器、伪元素选择器（p+p > a::after）；
6、通配符 *；

##### 1.2.2、媒体查询

1、@media + （not | only） + 媒体类型 + （and + 媒体查询）；
2、@media + screen and （min-width：1024px）：屏幕最小宽度为1024px时生效；
3、@media only screen and（min-width：1024px）：只对screen类型有效，且满足最小宽度；
4、@media not screen and（min-width：1024px）：对screen类型无效，且满足最小宽度；

# 2、块

### 2.1、层叠与继承

##### 2.1.1、层叠

概念：后写的样式会覆盖前面的样式，后面的元素会覆盖前面的，优先级高的会覆盖优先级低的；

##### 2.1.2、层叠上下文

1、background、border；
2、z-index < 0；
3、block元素；
4、float元素；
5、inline、inline-block元素；
6、z-index=auto、z-index=0；
7、z-index > 0；

##### 2.1.3、继承

属性：inherit（开启继承，子元素属性和父元素相同）、initial（使用默认样式）、unset（如果属性可继承则继承，否则是默认样式）；
可继承属性：color、font-size、font-family、line-height等；
不可继承属性：width、height、border、padding等；

### 2.2、伪类和伪元素

##### 2.2.1、伪类

定义：是选择器的一种，用于选择处于特定状态的元素（不存在dom树中或常规css无法选取）；
特性：没有创建文档树之外的元素；

##### 2.2.2、伪元素

定义：用于创建一些不在文档树中的元素；
特性：创建了文档树之外的元素；

### 2.3、盒模型

##### 2.3.1、块级、内联盒子

1、块级盒子：内联方向上占据父容器所有可用空间、每个盒子都会换行、width/height属性有效、内边距/外边距/边框都会把其他inline状态的盒子推开；
2、内联盒子：盒子不会换行、width/height属性不起作用、水平方向的内边距/外边距/边框会把其他inline状态的盒子推开、垂直方向的内边距/外边距/边框不会把其他inline状态的盒子推开；

##### 2.3.2、css盒模型

1、content-box：标准盒模型，宽高由内容区构成，不包括padding、border、margin；
2、padding-box：内边距盒模型，宽高由内容区+padding构成，不包括border、margin；
3、border-box：IE盒模型，宽高由内容区+padding+border构成，不包括margin；
4、margin-box：外边距盒模型，宽高由内容区+padding+border+margin构成；

# 3、文字

### 3.1、使用字体

##### 3.1.1、@font-face

1、font-family：定义字体集类型；
2、src：字体文件地址（url包裹）；
3、font-weight：指定字体粗细；
4、font-style：指定字体其他风格；

# 4、布局

### 4.1、正常布局

定义：不使用任何布局策略；

### 4.2、弹性盒子

概念：被专门设计出来用于创建横向或者纵向的一维页面布局；
使用：display=flex；

##### 4.2.1、结构组成

1、父容器：container，属性包括flex-direction（布局方向，默认row）、justify-content（沿着主轴方向对齐方式）、align-items（沿着交叉轴方向对齐方式）等；
2、子元素：item，属性包括flex-grow（增长基数）、flex-shrink（收缩基数）、flex-basis（基础尺寸）、order（排列顺序）、align-self（用于改变其在容器下的align-items属性）等；

##### 4.2.2、布局应用

1、n行/列布局：flex（0  0  100px）、flex（1 1 auto）、flex（0  0  200px）；

### 4.3、网格布局

概念：被设计用于在二维上把元素按行和列排列整齐；
使用：display=grid；

##### 4.2.1、结构组成

1、父容器：container，属性包括grid-template-rows（行数）、grid-template-columns（列数）、grid-gap（间距）等；
2、子元素：item，属性包括grid-row（start~end）、grid-column（start~end）；

### 4.4、浮动布局

使用：float（left、right、none、inherit）；

##### 4.4.1、实际应用

1、文字环绕效果；
2、块级元素同行排列；

##### 4.4.2、高度塌陷

原因：浮动元素脱离了文档流，其父元素的高度不包含该浮动元素；
解决：clear（both，两边浮动元素对于其失去了浮动效果，有了高度）、bfc（诸如加overflow等，容易造成其他影响）；


### 4.5、定位布局

##### 4.5.1、分类

1、静态定位：static，默认值；
2、相对定位：relative，可以移动其相对于正常的文档流中的位置；
3、绝对定位：absolute，脱离正常布局流，类似单独放在一个图层中；
4、固定定位：fixed，脱离正常布局流，将一个元素相对于浏览器视口固定；
5、粘性定位：sticky，新的定位方式，让元素先保持和static一样的定位，当他的相对视口位置达到某一个预设值时，就会像fixed一样定位；

### 4.6、表格布局

缺点：布局不灵活、繁重的标记、难以调试、性能问题等；
使用：display=table；

### 4.7、多列布局

使用：column-width=100px、column-count=10；

### 4.8、响应式布局

1、媒体查询：@media，移动优先，可以细粒化控制；
2、百分比布局：计算困难（margin/padding难以计算）；
3、rem布局：最佳布局方式，但js/css存在耦合；
4、视口布局：vw/vh，类似百分比，可以搭配rem；
5、图片响应式：图片自适应、srcset+sizes；

# 5、疑难杂症

### 5.1、重绘、回流

##### 5.1.1、重绘

概念：元素样式的改变不影响元素在文档流中的位置时（如color、visibility、outline、background-color等），浏览器只需要重新绘制，回流一定会重绘；

##### 5.1.2、回流

概念：元素位置、尺寸、结构或某些属性发生变化时（添加/删除可见元素、位置改变、尺寸改变、高度/宽度改变、内容变化、激活伪类、浏览器窗口尺寸变化、页面初次渲染等），浏览器重新渲染部分或全部文档的过程；

##### 5.1.3、减少重绘、回流

1、gpu动画：使用动画图层，transform、opacity、filter、will-change等，太多层时会导致内存占用较大，gpu渲染字体会导致抗锯齿无效；
2、position：将动画效果应用到绝对定位元素上，避免影响到其他元素的布局，只产生一个重绘；
3、visibility：使用visibility代替display，visibility不会造成回流；
4、documentFragment：尽量避免频繁操作dom，多个元素可以使用documentFragment，完成之后添加到dom树中；
5、多层内联样式：尽量避免使用多层内联样式，提高css匹配效率；
6、dom树末梢：尽量在dom树末梢修改样式，限制回流范围；
7、table布局：尽量避免使用table布局；
8、关键属性：尽量避免频繁读取clientXXX、offsetXXX、scrollXXX、width/height、getComputedStyle、getBoundingClientRect等，可使用变量缓存起来进行多次读取；

### 5.2、通用知识

##### 5.2.1、元素隐藏

1、display=none：不占用区域、不会触发其他绑定事件、没有继承性、计数器无效、css3的transition不支持display属性；
2、visibility=hidden：占用区域、不会触发其他绑定事件、有继承性（子元素visible可以显示）、计数器有效（li元素）、css3的transition支持visibility属性；
3、z-index<0：占用区域、会触发其他绑定事件...；
4、opacity=0：占用区域、会触发其他绑定事件、没有继承性、计数器有效、css3的transition支持；
5、transform=scale(0,0)：占用区域、不会触发其他绑定事件；

##### 5.2.2、BFC

概念：块级格式化上下文（block formatting context），独立的渲染区域或容器；
作用：去除浮动、防止字体环绕、去除垂直外边距重叠问题、自适应两列布局；
产生：根元素、float（非none）、position（absolute、fixed）、inline-block、flex、inline-flex、table-cell、overflow（非visible）等；
规则：内部块元素（block元素）在垂直方向上从顶部依次排列、同一个bfc中垂直的两个元素会发生外边距重叠、内部块元素的左边缘与容器左侧边缘接触、独立容器（不会影响到外面）、高度计算（包括内部浮动元素）、浮动盒子不会叠加到bfc上（非bfc时会覆盖在盒子上方）；

##### 5.2.3、css图形

1、圆形：border-radius=50%；
2、半圆：width=100、height=50、border-radius=100 100 0 0；
3、扇形：border-top-width=100、border-top-left-radius=100、width=100；
4、三角形：width=0、height=0、border-left=50 solid trans、border-right=50 solid trans、border-bottom=100 solid red；
5、梯形：width=50、height=0、border-width=50；