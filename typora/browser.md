## 1、基础知识

### 1.1、组成部分

1、浏览器进程：界面显示、用户交互、子进程管理、提供存储等；
2、渲染进程：将css、html、javascript转换为可以交互的网页，运行在沙箱中，每个tab独立进程（默认情况下，对应v8上下文环境）；
3、GPU进程：连接GPU进行绘制；
4、网络进程：加载网络资源，独立进程（同域名限制6个tcp连接，提升服务器性能，一开始协议是2，浏览器方没遵守，使用6-8）；
5、插件进程：运行插件，独立进程防止崩溃影响；

多进程副作用：高资源占用、复杂的体系架构；

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
3、begin frame：帧开始，包含window.resize、onscroll（经过验证，确实早于raf）、mediaquery changed、animation events等；
4、动画：请求动画帧，包含requestAnimationFrame、IntersectionObserver；
5、layout：布局计算，包含recalc style、update layout、ResizeObserver；
6、paint：绘制，包含composing、paint、record；
7、idle：空闲时间，包含requestIdleCallback；

注：vSync，垂直同步信号（沟通各方），显示器 => GPU => 浏览器进程 => 渲染进程，开始新一帧的绘制；

### 1.6、URL到页面展示

1、网络进程：组装url地址，检查本地缓存；
2、网络进程：进行DNS解析（hosts、本地缓存、首选服务器、权威服务器、根服务器、一级域服务器、二级域服务器....），返回IP；
3、网络进程：建立TCP连接（三次握手），发送请求；
4、网络进程：解析响应，status（301/302重定向、200），content-type（text/html、application/octet-stream等），提交文档；
5、渲染进程：解析内容（HTML解析器=> DOM Tree、CSS解析器=> CSSOM Tree、render tree、layout、paint）；

### 1.7、页面循环系统

##### 1.7.1、组成内容

1、渲染主线程：每个tab标签都有个渲染进程，而每个进程都有个主线程用于执行渲染，设计逻辑是循环；
2、消息队列：主线程每次循环均从消息队列中取任务进行执行；
3、延迟队列：存放定时器任务；
4、IO线程：用于向消息队列中添加任务，包括网络进程（资源加载等）、浏览器进程（鼠标点击事件等）、其他事件等，通过IPC方式通信；

##### 1.7.2、消息类型

1、输入事件：鼠标滚动、移动、点击等；
2、微任务；
3、文件读写；
4、WebSocket；
5、定时器；
6、页面渲染（html解析、样式计算、布局计算、css动画等）；
等...

##### 1.7.3、单线程弊端

1、微任务：每次宏任务执行时，如果dom有变化，会向微任务队列添加一个微任务，在宏任务执行完之前会执行微任务队列；
2、单任务执行时间过长：浏览器回调功能；

##### 1.7.4、定时器

1、通过延迟队列（使用map实现，类似红黑树，便于查找、删除等）实现，其中也都是宏任务；
2、当前任务执行时间过长时，定时器也会推迟执行；
3、定时器存在嵌套时，最短时间间隔为4ms（实时性较高的需求不太适合，比如动画，浏览器没有办法进行自动优化），可以使用raf来实现（固定16.6ms执行一次）；
4、未激活的tab标签，定时器最短时长是1000ms（优化加载损耗、省点）；
5、延迟执行最大时间是32位整型数字，即2^31-1ms（约24.8天），超过时默认按0算；

##### 1.7.5、微任务

1、宏任务队列：macrotask queue，包括：DOM操作、用户交互、网络请求、定时器、script标签、requestAnimationFrame、MessageChannel等；
2、微任务队列：microtask queue，包括：Promise、process.nextTick、MutationObserver；
3、调度过程：宏任务快执行完时，会检查全局执行上下文中的微任务队列，然后按顺序执行；
4、微任务中产生的微任务依然会在当前宏任务中继续执行，不会推迟到下一个宏任务中；
5、每个宏任务执行时，会创建自己的微任务队列，微任务队列的执行时间也会应用到宏任务中；
6、在一个宏任务中，分别创建一个用于回调的宏任务和微任务，无论如何，微任务均早于宏任务先执行；

##### 1.7.6、MutationObserver

1、早期采用Mutation Event响应dom元素变化，同步+多次执行（只要变化，就调用回调）存在性能问题；
2、MutationObserver采用微任务（异步、汇总更改内容，一次宏任务只回调一次）的策略提高了性能；

##### 1.7.7、Promise

1、消除嵌套地狱；
2、合并多个任务的错误处理；

### 1.8、调试工具

##### 1.8.1、network

1、queuing（请求调度）：请求排队，原因有TCP连接数限制（减轻服务器负担，可通过域名分片、http2方式解决）、资源优先级限制（css、html、js优先级高，图片、视频等优先级低）、磁盘分配等；
2、stalled（连接开始）：请求等待时间，包含连接异常情况处理（诸如复用已存在连接而产生连接重置等异常）、代理处理；
3、dns lookup（连接开始）：查找dns；
4、initial connection（连接开始）：建立连接，包括tcp握手、ssl握手；
5、request sent（请求、响应）：发送请求；
6、waiting（请求、响应）：TTFB（可通过缓存、cdn、减少cookie等方式解决），首字节时间，服务响应速度的重要指标；
7、content download（请求、响应）：响应内容下载（可通过压缩、提升带宽等方式解决）；

### 1.9、内容解析

##### 1.9.1、html解析

1、解析器：利用stack维护已访问节点，逐个进行解析（token、ast、生成dom节点、构建dom树）；
2、何时解析：网络进程加载了多少数据，解析器便会解析多少数据；
3、预解析操作：开辟新线程进行预解析，提前下载网络资源；
4、安全检查模块：分词器解析出token后，会检测是否符合csp规范、是否存在跨站点请求等；

##### 1.9.2、css解析

1、css不阻塞dom解析，但进行layout tree计算时需要等待css解析（css加载完之前，页面不会显示dom内容）；
2、css不阻塞js的加载，但会阻塞js的执行，遇到脚本标签时，会检测前面css解析器的工作（下载、构建cssom）是否完成，未完成则等待其完成；
3、应该尽量将css放于文档的头部（或者尽量内联），尽早的进行加载、解析、构建，对于大的css文件做适当拆分+按需加载；

##### 1.9.3、js解析

1、js会阻塞dom解析：遇到脚本标签时，会停止html解析器（脚本可能会更改html内容），进行脚本的下载、执行；
2、应该尽量将js放于文档尾部（或者尽量内联），推迟脚本的执行（async、defer）；
3、脚本执行之前，必定会先将cssom构建好；

### 1.10、帧渲染

##### 1.10.1、生成帧方式

1、重排：根据cssom+dom来计算布局树，包括所有渲染过程，效率较低；
2、重绘：没有重新布局阶段，仅有计算绘制信息及绘制操作等，效率一般；
3、合成：没有布局、重绘阶段，还可以借助GPU，效率较高；

##### 1.10.2、合成技术

1、分层：生成布局树之后，渲染引擎会将布局树转化成层树（layer tree），将元素分层绘制成图片；
2、分块：合成线程将每个图层分割成大小固定的图块，优先绘制靠近视口的图块，首次合成时会制作一个低分辨率的图片；
3、合成：利用合成线程（不影响主线程，主线程卡主，css动画依然能够运行），将光栅化阶段得到的图片合成一张图片；

##### 1.10.3、css动画

1、可以使用will-change、transform等提升合成层，处理几何变换、透明度变换等，css动画效率高于js动画；
2、合成层需要单独的内存（GPU内存）；

### 1.11、PWA

##### 1.11.1、概念

1、渐进式Web应用：通过技术手段渐进式缩短和本地应用或小程序的距离；
2、Web应用缺少点：离线使用能力（Service Worker）、消息推送能力（Service Worker）、一级入口（manifest.json，不需要打开浏览器）；

##### 1.11.2、Service Worker

1、网络拦截器（必须基于https，遵守同源策略、内容安全策略csp等），用来拦截和缓存请求；
2、衍生自Web Worker，但从属于浏览器主进程，所有页面共享一个worker线程；
3、消息通知基于Notification Api，需要用户授权，国内推送不太行，要自建中间服务；

### 1.12、WebComponent

##### 1.12.1、概念

前端组件化；

##### 1.12.2、组成

1、自定义元素：custom elements；
2、影子DOM（核心）：shadow dom；
3、HTML模板：HTML template；

##### 1.12.3、影子dom

1、影子dom中的元素对于整个网页是不可见的；
2、影子dom中的样式不会影响到外部网页内容；
3、影子dom的设计：查找dom的设计、样式内容的设计；

## 2、应用

### 2.1、同源策略

##### 2.1.1、概念

1、概念：sop（same-origin-policy）；
2、条件：协议、域名、端口三者任意不匹配；
3、不会跨域的标签：script、image（埋点使用）、link；

##### 2.1.2、影响

1、dom层面：同源时，诸如opener属性可以修改另外标签的dom元素；
2、数据层面：同源时，不同标签可以拿到相同的cookie、indexdb、storage等；
3、网络层面：同源时，xhr等可以无限制的请求；

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
4、response属性：headers（响应头，Header对象）、ok（布尔值，状态码200-299）、redirected（重定向状态，请求来自重定向则为true）、status（状态码，200等）、statusText（状态消息，ok等）、type（响应类型，basic标准值同源响应、cors跨域请求、error网络错误、opaque不允许跨域）、url（请求url）、body（响应体）；
5、原型方法：clone、arrayBuffer、blob、formData、json（转成json）、text（转成string）；
6、ReadableStream对象：locked属性（只可读取一次）、cancel（取消读取流）、getReader（获取reader对象，手动进行读取）、pipeTo、pipeThrough、tee；
7、缺点：不支持同步请求、不支持取消请求、无法查看进度、不支持超时设置；
8、兼容性：IE不支持、chrome42、ff39、safari10.1；

### 2.6、cookie

1、属性：name、value、domain（仅当同域才可以访问，子域可以访问父域）、path（必须一致）、expires/max-age、size、httponly（仅从http发，js无法获取）、secure（进从https发）、samesite、priority；
2、优化：去除多余cookie、压缩、过期时间、domain控制；
3、安全：会被浏览器自动带上，会导致xss、csrf问题，可以通过在头部添加token解决；

### 2.7、首屏优化

1、资源请求（cdn、gzip、缓存）；
2、资源预请求（prefetch、preload）；
3、代码优化（tree shaking、按需懒加载）；

