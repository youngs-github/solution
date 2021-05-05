# 1、MVVM

### 1.1、基本原理

1、Object.defineProperty劫持对象的访问器属性；
2、静态、动态分析对象监听依赖以实时更新；

### 1.2、监听数组

1、无法监听数组长度改变：length属性不可配置，无法劫持；
2、无法监听数组索引赋值：数组长度/内容不定，实现成本较高且困难；
3、折中办法：劫持prototype的push、shift、splice等修改属性，索引编辑可使用vm.$set/Vue.set方法；

### 1.3、兼容性

IE9、Chrome5、Firefox4、Safari5；

# 2、静态全局方法

1、mixin：全局注入一个混入，影响注册之后所有创建的每个Vue实例，例如插件install方法内部使用Vue.mixin注入自定义生命周期、往Vue实例中注入某些全局属性（推荐在编写插件时使用）；
2、extend：继承自Vue构造器，同时继承其options属性，可用来自定义组件/实例；
3、use：安装Vue插件，Vuex、Vue-Router等都是通过Vue.use方法进行安装，只会安装一次（内部维护了插件数组），可以定义install方法，没有时将认为插件即是方法（例如：自定义插件注入全局配置项，组件内可以通过this.$config.xxx进行访问）；
4、component：注册或获取全局组件，组件会被注册到options属性中；
5、directive：注册或获取全局指令（bind、update）；
6、filter：注册或获取全局过滤器；
7、compile：将模板字符串编译成render函数，只在完整版内可用，常见开发版/生产版均没有；
8、set/delete：同原型上的$set/$delete，响应式定义；

# 3、原型方法

1、$nextTick：等同于Vue.nextTick，通过微任务调度更新方法；
2、$on：注册监听事件，通过$emit触发，可带参数，内部用array存储多个监听事件；
3、$off：注销监听事件；
4、$once：同$on，仅执行一次（内部通过 $on + $off 注册及取消事件监听）；
5、$emit：发布事件，可带参数；
6、$forceUpdate：强制更新，调用vm._watcher.update方法，仅仅影响实例自身和插入插槽内容的子组件；
7、$destroy：主动销毁组件实例，执行销毁时的生命周期钩子；
8、$set：用于object新增属性监听（调用内置defineReative$$方法）、数组对象索引数据编辑（调用splice方法）；
9、$delete：用于object删除属性监听（delete再notify）、数组对象索引数据删除（调用splice方法）；
10、$watch：系统构造watch对象监听方法，静态收集依赖；
11、$mount：dom渲染方法，可以替代el属性定义；

# 4、实例属性

1、$data：Vue实例观察的对象；
2、$props：当前组件接收到的props对象；
3、$el：Vue实例使用的根Dom元素；
4、$options：Vue实例的初始化属性；
5、$parent：父实例；
6、$root：根实例，如果没有父实例，指向自身；
7、$children：实例的直接子组件，不保证顺序，也不是响应式；
8、$slots：实例的插槽内容，不是响应式的；
9、$scopedSlots：实例的作用域插槽内容；
10、$refs：实例的dom元素及组件实例；
11、$isServer：是否服务器环境；
12、$attrs：非属性特性（参数透传），包含父作用域中不作为props属性的attribute绑定，用于爷孙组件传值；
13、$listeners：类似$attrs，包含父作用域中的v-on事件监听器，用于爷孙组件传递监听方法；

# 5、生命周期

1、new；
2、beforeCreate；
3、created；
4、beforeMount（$mount方法内才会进行render操作，故子组件初始化/渲染在该钩子之后，在mounted之前）；
5、mounted；
6、beforeUpdate；
7、updated；
8、activated：只有在keep-alive中才生效；
9、deactivated：只有在keep-alive中才生效；
10、beforeDestroy；
11、destroyed；
12、errorCaptured；

# 6、computed及watch

1、computed原理：一个computed分配一个watcher（存储于vm._computedWatchers上），getter方法会在watcher的get方法中调用，而默认会添加lazy属性true（懒执行，读取时才会初始化，并且dirty=lazy），然后将属性挂在到vm实例上，运行时引用（初次时，lazy=dirty=true，watcher调用evaluate方法获取value值并且更新dirty=false），存在属性缓存，动态收集依赖，返回数据；
2、watch原理：一个watch属性分配一个watcher（默认user=true，添加immediate属性会立即执行），针对vm上已经存在的属性（props、data、computed等，若不存在，则无效，不会触发）进行监听，在初始定义时，watcher.get方法会收集依赖（静态收集依赖），返回取消该watcher的方法；
3、两者区别：computed（计算属性、懒执行、动态依赖收集）、watch（监听属性、可立即执行、静态依赖收集）；

# 7、属性传递及通信

### 7.1、属性传递

1、props：将父组件提供的props对象进行浅拷贝至子组件中，关于组件修改props时的检测（组件更新时，有个更新状态，仅当父组件主动更新子组件时，该状态才为允许状态，否则修改该值时均处于非法状态，故提示）；
2、$attrs/$listeners：类似react的props，参数透传，用于爷孙组件传值，制作公共组件时可以使用；
3、provide/inject：类似react的context，可以跨多层组件传参，非响应式，耦合性高，所以项目正常开发不推荐使用，集成库时可以使用；

### 7.2、状态通信

1、$emit：子组件触发自身的$listeners事件（父组件的v-on会保存在子组件的$listeners中）；
2、$bus：消息总线；
3、vuex：略；

# 8、nextTick

### 8.1、实现原理

利用微任务特性（Promise、MutationObserver、setImmediate、setTimeout），拆分更新任务（在watcher对象的update方法中调用queueWatcher方法，将调度任务添加到队列中），将更新任务放入callbacks队列，等待微任务执行flushCallbacks方法，运行每一个更新任务（queueWatcher方法会将flushSchedulerQueue方法放入callbacks队列，此为真正的调用watcher.run的函数）；

### 8.2、执行顺序

1、对比Promise：如果存在Promise，则按正常顺序执行（先定义则先执行）；
2、在更新前调用：该方法执行时间早于flushSchedulerQueue方法，故此时vm[key]值已更新，但是dom值未更新，所以dom是旧值；

# 9、slot插槽

插槽只能于template、组件中使用，否则无效且有警告；

### 9.1、具名插槽

父组件：<div v-slot:name /> （v-slot指令可以换成：#，且必须带有参数：#name，无参时会有警告）
子组件：<slot name="name" />
注意点：子组件通过name预定义插槽名称，父组件进行对应使用，name默认值为default（可省略）；

### 9.2、作用域插槽

父组件：<div v-slot:name="scope">{{ scope.key }}</div>
子组件：<slot v-bind:name="scope" />  (v-bind指令即绑定指令，相当于冒号，故可以存在多条)

# 10、虚拟DOM

### 10.1、作用

1、提升性能：减少dom的创建、销毁操作，改用js对象的创建、销毁，复用部分dom，一点程度提升性能；
2、跨平台：web、移动端、服务端等；
3、提升兼容性：UI框架端解决掉部分兼容性问题；

### 10.2、diff算法

特点：同级比较，深度优先；

#### 10.2.1、原理

1、建立两组游标（头 -> 尾、尾 -> 头），逐个比较（头头比较、尾尾比较、头尾比较、map映射，比较vnode的key、tag、data等），更新dom相应属性（强制更新：attrs、class、listeners、props、style、ref、directives），设置dom内容（子节点继续递归、text节点、新增节点、移除节点）；

#### 10.2.2、优缺点

1、优点：使用vnode+diff算法可以实现最大限度对dom元素的复用；
2、缺点：2.x版本的diff算法必须全量更新dom的attrs、class等属性，3.x版本改进；

# 11、vue-loader

### 11.1、作用

1、针对.vue文件进行解析拆分提取（template、script、style等），作为后续处理的源（如解析template、style内的资源文件）；
2、为每个组件模拟出scope css效果；
3、提供热重载功能支持；

### 11.2、实现

1、parse：利用vue-template-compiler插件将.vue文件解析成sfc（template、script、style等），以及sourceMap文件；
2、index：根据第一步解析出的sfc对象生成单独的资源文件（?vue&type=template/script/style），附带上热重载代码（accept等）；
3、select：热重载时，根据查询条件中的类型返回本地缓存代码块（block）；
4、plugin：VueLoaderPlugin插件，根据webpack版本注册vue-loader插件；
5、pitcher：添加一些处理插件；

### 11.3、编译内容

##### 11.3.1、template

输出：render方法；

​	名称	|  vue2.x  |  vue

|               | vue2.x              | vue3.x                             |
| ------------- | ------------------- | ---------------------------------- |
| this对象      | with (this)         | with (ctx)                         |
| _c方法        | createElement       | createBlock                        |
| v-for         | _l方法              | fragment + renderList方法          |
| v-if          | 三元表达式 + _c方法 | 三元表达式 + createBlock + 静态key |
| 静态属性/节点 | 无                  | 提升到render方法之外               |

# 12、vue-router

### 12.1、原理

1、通过Vue.use（Vue.mixin）注册一个全局组件（beforeCreate、destroyed生命周期钩子）用于处理每一个组件的渲染操作；
1、利用onpopstate监听浏览器自身history状态改变方法（pushState、replaceState、back、go、forward）；
2、匹配相应的url放置于router-view元素中，自定义render方法用于渲染具体组件；

### 12.2、popstate与hashchange

1、popstate：浏览器做出动作时（go、back、forward）会触发，而其他的（pushState、replaceState）不会触发，兼容性：IE10、ff4；
2、hashchange：仅当hash值改变时才会触发，如果浏览器不支持popstate，将会采用hashchange，兼容性：IE8、ff3.6、chrome5；

### 12.3、hash与history

1、hash：url中含有#号，无刷新，请求服务时，不会把#也带过去，微信里面分享的二维码等会把#截掉，导致异常；
2、history：url中没有#号，无刷新，请求服务时，使用完整的url，需要后端配合做路由，否则会404；

### 12.4、其他

1、router-link：生成a标签，点击时，阻止默认点击事件，通过响应式原理触发app._route属性更新；
2、router-view：支持嵌套路由（由当前元素往上级查找，若查找到祖先元素也是router-view，则该路由是嵌套路由），命名路由（components作为对象，子属性key即为路由名称），内部有缓存；
3、导航守卫：beforeEach（简单权限控制）、beforeRouteEnter、 beforeRouteLeave、afterEach；

# 13、vuex

### 13.1、原理

1、通过Vue.use（Vue.mixin）注册一个全局组件（beforeCreate）用于处理每一个组件的渲染操作；
2、组成：state（数据源）、getters（类似computed，带有缓存）、mutations（修改state的方法，建议使用同步方法，严格模式下，非mutations中修改state将会报错）、actions（异步提交mutation）、modules（命名空间）；
3、辅助函数：在computed中使用，将属性扩展到vm中，包含mapState（将state扩展到vm中）、mapGetters（将getters扩展到vm中）、mapMutations（将mutations扩展到vm中）、mapActions（将actions扩展到vm中）；

### 13.2、问题

1、mvvm与state：双向绑定中，直接将state属性绑定于input等DOM元素中时，由于修改state属性不是在mutations中，所以严格模式下会报错，所以需要使用mapState+mapMutations做中转，或者使用computed定义访问器属性劫持属性的get/set方法；

# 14、vue3.x

### 14.1、变化

#### 14.1.1、源码结构

Vue2.x：src下compiler（编译器部分）、core（核心响应式部分）、platforms（跨平台部分）、server（服务端渲染部分）、sfc（单文件组件解析部分）、shared（工具及常量部分），打包时整体均会进行打包；
Vue3.x：compiler-core（编译器核心部分）、compiler-dom（编译器dom解析部分）、compiler-sfc（编译器单文件组件部分）、compiler-ssr（编译器服务端渲染部分）、reactivity（核心响应式部分）、runtime-core（运行时核心部分）、runtime-dom（运行时dom部分）、shared（工具及常量部分）、vue（主入口），打包时有益于tree-shaking；

#### 14.1.2、编译器

Vue2.x：template => parse（生成ast树）=> optimize（遍历ast树，标记静态节点，patch时跳过）=> generate（使用with语句，生成render方法）；
Vue3.x：template => parse（生成ast树）=> transform（遍历ast树，标记静态节点，静态节点提升 => 静态节点超过10个会字符串化、静态属性提升、事件缓存 => 避免诸如监听事件等的重复创建、block tree => 提升动态节点至根节点以避免patch时深度diff及重复创建）=> generate（不再使用with语句，直接使用babel解析生成render方法）；

#### 14.1.3、响应式

Vue2.x：使用Object.defineProperty（劫持属性访问器 + 闭包 + 递归遍历）+ Array.prototype（劫持原型方法）+ 依赖收集（Watcher + Dep）；
Vue3.x：使用Proxy（代理 + 懒监听） + Reflect（反射）+ 依赖收集（WeakMap + Map + Set）；

#### 14.1.4、API

1、修改全局api结构，增加createApp方法作为统一入口，不再支持new操作，更符合函数式编程理念；
2、原先全局use、mixin、component、directive移动至实例下面，移除extend、filter、set/get方法；
3、增加全局effect、watchEffect、reactive、readonly、computed、ref、toRef、toRefs等响应式方法；
4、增加全局onBeforeMount、onMounted、onActivated、onDeactivated、onBeforeUpdate、onUpdated、onBeforeUnmount、onUnmounted等生命周期方法；
5、增加全局provice、inject方法，以供跨组件通信（可使用reactive等转成响应式）；
6、增加全局isProxy、isReactive、isReadonly等判断方法；
7、增加全局h方法，代替原有createElement方法；
8、增加全局nextTick方法，代替原有实例$nextTick方法；
9、移除$on、$once、$off（该部分可由第三方提供，通过mixins注入）；
等...

#### 14.1.5、patch

Vue2.x：从组件根元素开始，进行全量比对；
Vue3.x：从组件根元素开始，通过组件类型（type字段）精确定位具体更新逻辑，编译器提供的dynamicChildren还可用于精确diff子元素；

#### 14.1.6、diff

Vue2.x：采用头 <=> 头、头 <=> 尾交叉比较  + map映射的方式（同级比较、深度优先）；
Vue3.x：采用头对头比较、尾对尾比较（去头掐尾）+ Map映射的方式（同级比较、深度优先）；

# 15、vue-cli

### 15.1、常用命令

##### 15.1.1、创建项目

命令：vue create name；
帮助：vue create --help；
老版：vue init webpack name；

##### 15.1.2、新增模块

命令：vue add eslint；

##### 15.1.3、升级版本

命令：vue update -g @vue/cli；

### 15.2、webpack

##### 15.2.1、loader

1、添加：config.module.rule(name).test().use()...；
2、修改：config.module.rule(name).uses.clear()；

##### 15.2.2、plugin

1、添加：config.plugin(name).tap()...；
2、修改：config.plugin(name).tap()...；

15.2.3、配置

1、静态配置：configureWebpack；
2、链式配置：chainWebpack；