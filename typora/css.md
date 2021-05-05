# 1、基础

### 1.1、属性

##### 1.1.1、css3属性

1、animation：动画属性，IE10、chrome43、ff16、safari9；
2、background-origin：背景图片的position相对于什么盒子来定位（content-box、padding-box、border-box等），IE9、chrome1、ff4、safari3；
3、background-size：背景图片尺寸（cover、contain等），IE9、chrome3、ff4、safari5；
4、flex：弹性布局，IE11、chrome29、ff20、safari9；
5、grid：网格布局，IE不支持、chrome57、ff52、safari10；
6、opacity：透明度，IE9（IE4-8用filter=alpha）、chrome1、ff1、safari1；
7、perspective：三维z轴距离，IE10、chrome36、ff16、safari4；
8、point-events：鼠标事件，IE11、chrome1、ff1、safari4；
9、transform：变形，IE10、chrome36、ff16、safari9；
10、transition：过渡效果，IE10、chrome26、ff16、safari9；
11、keyframes：关键帧动画，IE10、chrome43、ff16、safari9；

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
8、css合成层；

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

##### 4.1.1、BFC

概念：块级格式化上下文（block formatting context），独立的渲染区域或容器；
作用：去除浮动、防止字体环绕、去除垂直外边距重叠问题、自适应两列布局；
产生：根元素、float（非none）、position（absolute、fixed）、inline-block、flex、inline-flex、table-cell、overflow（非visible）等；
规则：内部块元素（block元素）在垂直方向上从顶部依次排列、同一个bfc中垂直的两个元素会发生外边距重叠、内部块元素的左边缘与容器左侧边缘接触、独立容器（不会影响到外面）、高度计算（包括内部浮动元素）、浮动盒子不会叠加到bfc上（非bfc时会覆盖在盒子上方）；

##### 4.1.2、IFC

概念：内联格式化上下文（inline formatting context）；
特性：线框（line box）高度由包含的最高行内元素决定、IFC中不可能有块级元素（p中插入div会导致p分裂成2个）、IFC对外表现为块级元素（block，与div垂直排列）；
应用：水平居中（子元素inline-block会在外层产生IFC，通过text-align可以水平居中）、垂直居中（用其中一个元素撑开父元素的高度，并设置其vertical-align=middle，则其他行内元素可以在此父元素下垂直居中）；

##### 4.1.3、元素隐藏

1、display=none：不占用区域、不会触发其他绑定事件、没有继承性、计数器无效、css3的transition不支持display属性；
2、visibility=hidden：占用区域、不会触发其他绑定事件、有继承性（子元素visible可以显示）、计数器有效（li元素）、css3的transition支持visibility属性；
3、z-index<0：占用区域、会触发其他绑定事件...；
4、opacity=0：占用区域、会触发其他绑定事件、没有继承性、计数器有效、css3的transition支持；
5、transform=scale(0,0)：占用区域、不会触发其他绑定事件；

##### 4.1.4、line-height

1、概念：两行文字基线之间的距离；
2、基线：top（顶线）、text-top（文字顶部）、middle（中线）、baseline（基线）、text-bottom（文字底部）、bottom（底部）；
3、高度：内联元素高度由line-height决定，多行文本的高度等于单行文本高度的累加；
4、属性：normal（默认，非继承）、数字（1.2等，根据自身font-size计算行高）、百分比/数值单位（20px）；
5、块盒子内img底部区域问题：块盒子（font-size=0、line-height=0）、子元素（display=block、vertical-align=bottom）；

##### 4.1.5、vertical-align

1、基线类：top、middle、baseline、bottom，盒模型的strut节点（支柱）继承了line-height；
2、文本类：text-top、text-bottom；
3、上/下标：sub、super；
4、数值百分比：px、em、%；
5、生效前提：inline、inline-block、table-cell；

### 4.2、弹性盒子

概念：被专门设计出来用于创建横向或者纵向的一维页面布局；
使用：display=flex；

##### 4.2.1、结构组成

1、父容器：container，属性包括flex-direction（布局方向，默认row）、justify-content（沿着主轴方向对齐方式）、align-items（沿着交叉轴方向对齐方式）等；
2、子元素：item，属性包括flex-grow（增长基数）、flex-shrink（收缩基数）、flex-basis（基础尺寸）、order（排列顺序）、align-self（用于改变其在容器下的align-items属性）等；

##### 4.2.2、布局应用

1、n行/列布局：flex（0  0  100px）、flex（1 1 auto）、flex（0  0  200px）；

##### 4.2.3、FFC

概念：弹性布局格式化上下文（flexable formatting context）；
特性：独立的渲染区域；

### 4.3、网格布局

概念：被设计用于在二维上把元素按行和列排列整齐；
使用：display=grid；

##### 4.2.1、结构组成

1、父容器：container，属性包括grid-template-rows（行数）、grid-template-columns（列数）、grid-gap（间距）等；
2、子元素：item，属性包括grid-row（start~end）、grid-column（start~end）；

##### 4.2.2、GFC

概念：网格格式化上下文（gridlayout formatting context）；
特性：独立的渲染区域，类似table布局；

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

概念：实现不同分辨率上不同的展示方式，一个网站能够兼容多个终端；
1、meta标签兼容移动端；
2、媒体查询：@media，移动优先，可以细粒化控制；
3、百分比布局：计算困难（margin/padding难以计算）；
4、rem布局：最佳布局方式，但js/css存在耦合；
5、视口布局：vw/vh，类似百分比，可以搭配rem；
6、图片响应式：图片自适应、srcset+sizes；

### 4.9、自适应布局

概念：让同一张网页自动适应不同大小的屏幕；
缺点：无论如何，主体的内容和布局没有变，如果屏幕太小，网页内容依然会挤在一起；

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

##### 5.2.1、css图形

1、圆形：border-radius=50%；
2、半圆：width=100、height=50、border-radius=100 100 0 0；
3、扇形：border-top-width=100、border-top-left-radius=100、width=100；
4、三角形：width=0、height=0、border-left=50 solid trans、border-right=50 solid trans、border-bottom=100 solid red；
5、梯形：width=50、height=0、border-left=50 solid trans、border-right=50 solid trans、border-bottom=50 solid red；

##### 5.2.2、link、@import

1、概念：link是xhtml标签，@import由css提供；
2、加载顺序：link会随页面一同被加载，@import会等到页面被加载完再加载；
3、兼容问题：link基本没有兼容问题，@import兼容IE5；
4、样式权重：link的样式权重高于@import；
5、元素可控：link是dom元素，可以控制，@import属于css，dom无法控制；

### 5.3、sass、less

##### 5.3.1、区别

1、环境：less在js上运行，sass在ruby上运行；
2、变量：less用@，sass用$；
3、循环：less只允许循环数值，sass可以遍历任何类型；
4、其他：less稍显简单，sass更像一门正规的编程语言；

##### 5.3.2、extend、include

extend：继承语法，编译后会将当前的.class也一并编译，不会生成重复代码；
include：引用混合样式（@mixin），会将引用的代码复制到当前.class里面；

##### 5.3.3、mixin

混合指令，使用@include引用，类似定义样式变量对象；



# 6、移动端问题

### 6.1、1px问题

概念：移动端的设计图尺寸往往会大于屏幕真实尺寸，例如宽度300px的屏幕设计图是600px或更高，更多是边框宽度问题；
解决：
1、0.5px：新版的一些浏览器已经支持；
2、viewport+rem：dpr，initial-scale=0.5，需要用js修改meta标签内容，如果dpr=2，则initial-scale=0.5，圆角也没问题；
3、transform+伪元素：父元素relative，伪元素before/after设置200%大小、border=1px、scale=0.5，如果已经被使用，则可能需要嵌套实现；
4、border-image：局限性比较大；
5、background-image：局限性比较大；

### 6.2、点击延迟问题

概念：移动端浏览器点击之后300ms才会触发真正的click事件，源于双击缩放功能，safari率先引入；
解决：
1、禁用缩放：优先选用，meta标签使用viewport控制user-scalable=no、maximum-scale、minimum-scale；
2、更改默认视口宽度：meta标签使用viewport控制width=device-width，没有完全禁用缩放，用户依然可以用双指控制；
3、js控制：fastclick、tap等，在touchend时mock一个click事件，并把原生300毫秒触发的click事件阻止掉；

### 6.3、点击穿透问题

概念：在使用touchstart事件时，由于移动端事件顺序（touchstart => touchend => click）的原因，如果隐藏某个元素，click事件可能会派发到其下面的元素上，造成意外事件；
解决：click事件很难用touchstart代替，另外touchstart还会引起用户滑动的时候误触发；