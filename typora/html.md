## 1、doctype作用

1、声明文档解析类型：必须放在第一行，可能会影响css及js的解析；
2、文档解析类型：backcompat（怪异模式，默认）、css1compat（w3c标准模式）、近乎标准（IE8环境，基本淘汰）；

## 2、html/xml/xhtml

1、html：超文本标记语言，4.0版本之前都是现有实现再有标准，导致其非常松散及混乱；
2、xml：可扩展标记语言，主要用于存储数据及结构，比json更庞大、低效一些；
3、xhtml：可扩展超文本标记语言，基于html及xml两者而生，w3c为了解决html混乱问题而基于此诞生了html5，并在开头加入<!DOCTYPE html>，不加就是兼容混乱html，加了就是标准模式；

## 3、html4/5区别

1、文档声明类型：<!DOCTYPE html>；
2、新的解析顺序：不再基于SMGL；
3、新元素：section、video、progress、nav、aside、canvas、footer、source等；
4、input新类型：date、email、url等；
5、新的属性：ping（用于a及area）、charset（用于meta）、async（用于script）、全域属性（id、tabindex、repeat等）、新的全域属性（contenteditable、contextmenu、draggable、dropzone、hidden、spellcheck等）、移除元素（applet、basefont、big、center、dir、font、frame、frameset等）；

## 4、html语义化

1、优势：开发者友好（增强可读性，可以清晰的看出文档结构，便于开发及维护）、机器友好（适合搜索引擎爬虫，支持读屏软件等）；
2、适用条件：对于富文本类应用很重要，对于功能性的软件没什么作用；

## 5、src/href区别

1、src：指向外部资源位置，常见有script、img、iframe等，会阻塞其他资源的加载及编译；
2、href：超链接，不会阻塞；

## 6、defer/async

1、defer：异步下载，同步执行，执行在文件加载解析完成、domcontentloaded事件之前；
2、async：异步下载，异步执行，加载完成后立即执行，但是顺序混乱，可用性不大；
3、总结：现实中，延迟脚本并不一定会按照顺序执行（async），也不一定会在domcontentloaded事件之前执行（async），因此最好只包含一个延迟脚本；

## 7、存储方式

1、cookie：html5标准之前的主要存储方式，兼容性好，最大只有4k，不同浏览器对个数限制不一致；
2、localstorage：html5新加入，键值对型，永久性存储，同源窗口可访问，最大5M，兼容IE8、chrome4、ff3.5、safari4；
3、sessionstorage：html5新加入，键值对型，session型存储，仅自身窗口可访问，最大5M，兼容IE8、chrome5、ff2、safari4；
4、websql：关系型存储数据库，已废弃；
5、indexedDB：html5新加入，键值对型，兼容IE10、chrome23、ff10、safari7.1；

