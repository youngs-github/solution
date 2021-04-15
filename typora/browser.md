## 1、浏览器

### 1.1、组成部分

用户界面、浏览器引擎、UI引擎、网络、JS引擎、数据存储；

### 1.2、常见内核

1、chrome：内核（webkit、blink），js引擎（v8）；
2、firefox：内核（gecko），js引擎（spiderMonkey）；
3、safari：内核（webkit），js引擎（javascriptCore）；
4、edge：内核（edgeHtml），js引擎（chakra）；
5、ie：内核（trident），js引擎（chakra）；
6、nodejs：js引擎（v8）；

### 1.3、渲染UI

1、html解析：解析成dom tree；
2、css解析：解析成style rules；
3、合成dom树：将dom tree 和 style rules 合成为render tree；
4、布局：计算每个节点在屏幕的坐标；
5、绘制：paint过程；

### 1.4、解析css选择器

1、从右往左解析；
2、如果从左往右，那么查找不到时需要进行回溯，效率很低；

### 1.5、帧计算

1、input event：用户交互事件，包括阻塞事件（touch、wheel）、非阻塞事件（click、keypress）；
2、js：js主线程解析执行，包含timer定时器；
3、begin frame：帧开始，包含window.resize、onscroll、mediaquery changed、animation events等；
4、动画：请求动画帧，包含requestAnimationFrame、IntersectionObserver；
5、layout：布局计算，包含recalc style、update layout、ResizeObserver；
6、paint：绘制，包含composing、paint、record；
7、idle：空闲时间，包含requestIdleCallback；

## 2、应用

### 2.1、同源策略

1、概念：sop（same-origin-policy）；
2、条件：协议、域名、端口三者任意不匹配；
3、不会跨域的标签：script、image、link；
4、影响：cookie、storage等无法访问；

### 2.2、跨标签通信

1、postMessage：可主动发往某个win；
2、storage事件监听：不可跨域；
3、window.name/cookie：不可跨域；
4、MessageChannel：可利用postMessage将port发往不同win，然后进行通信；
5、BoardCastChannel：不可跨域，同源时，利用相同name进行通信；
6、websocket：外部方法；

### 2.3、缓存

1、service worker：优先级最高，必须在https环境下，拦截fetch请求，可自由控制缓存内容；
2、memory cache：持续性很短，关闭标签即释放，包括样式、脚本、图片等（prefetch）；
3、disk cache：容量/时效性，大文件优先存硬盘，内存不足时优先存硬盘，包括字体、css、js等；
4、push cache：session级别，所有内容都能被推送及缓存，不够普及；

### 2.4、xhr对象

1、open方法：参数（method，url，async=true，username？，password？）；
2、send方法：支持string、blob、formdata、int8array；
3、常用属性：readyState=4、status=200、statusText（200 OK）、response（arraybuffer、blob、document、string等）、responseText（string）、responseType（""、arraybuffer、blob、document、json、text）、responseURL（响应url）、responseXML（响应document）、timeout（超时时间）、withCredentials（指定跨域请求是否携带cookie）；
4、常用方法：abort（终止请求）、getRequestHeader（获取请求头）、setRequestHeader（设置请求头，必须在open之后，send之前）；
5、事件监听：onreadystatechange、onabort、onerror、onload、onloadend、onloadstart、onprogress、ontimeout；
6、upload对象：onabort、onerror、onload、onloadstart、onloadend、onprogress；

### 2.5、fetch对象

1、input对象：必选参数，可以是url或者request对象，request对象的大部分属性均是只读，所以实际使用时，大多将其写为url字符串；
2、init对象：可选参数，包含method、body（请求体，blob、formdata、string等）、headers、referrer、mode（请求模式，cors、no-cors、same-origin等）、cache（缓存，default、reload、no-cache等）、credentials（携带cookie，include、omit、same-origin等）、destination、redirect（默认fellow自动重定向）、clone（创建一个副本）；
3、状态：仅当网络异常时，fetch才会被catch，其余情况下，只要浏览器能够收到回复（4xx），即走then，可利用response.ok状态判断；

### 条件

1、文件上传判断类型
	1.1、type+name
	1.2、二进制头尾内容