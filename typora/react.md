# 1、react

### 1.1、fiber架构

##### 1.1.1、fiber概念

1、原理：fiber是一种数据结构，用于描述react最小的工作单元；
2、特性：增量渲染（任务拆分、时间分片）、更新暂停/终止/恢复、任务调度优先级；
3、优点：通过任务拆分及时间分片策略，解决同步渲染时卡顿掉帧问题（concurrent目前还在测试阶段）；

##### 1.1.2、fiber属性

1、节点类型：tag（节点类型）、type（虚拟dom类型）、elementType（同type）、key、alternate（初始化时指向null，更新时指向原有正在屏幕上显示的fiber节点）等；
2、节点关系：child（第一个子节点）、index（在父元素下的索引，如果没有key，则使用index）、sibling（兄弟节点）、return（父节点）；
3、节点属性：pendingProps（当前最新props对象）、memoizedProps（上一次渲染的props对象）、memoizedState（上一次渲染的state对象）、dependencies（外部依赖，包含context等）；
4、渲染属性：mode（更新类型，严格/blocking/concurrent模式）、effectTag（副作用effect类型）、firstEffect（第一个需要更新的节点）、nextEffect（下一个）、lastEffect（最后一个）、expirationTime（根据时间判断更新优先级）、updateQueue（组件更新存储的数据，单向循环链表）；

##### 1.1.3、fiber调度

1、workLoop：循环遍历；
2、beginWork：根据currentFiber、oldProps、newProps等判断当前是否需要更新并选择具体策略；
3、reconcileChildren：实现vdom到realdom的转换；
4、commitRoot：提交fiber树的更新；
5、commitMutationEffects：调用生命周期钩子；

##### 1.1.4、空闲时间

1、requestIdleCallback：浏览器空闲时间，兼容性不够，react团队利用MessageChannel实现了一款替代品；

### 1.2、生命周期

##### 1.2.1、方法

1、componentWillReceiveProps：已废弃，参数（newProps、newCtx），初始化时不执行，组件props变化时执行，初始化时不执行；
2、getDerivedStateFromProps：替代上面，参数（newProps、oldState），初始化时不执行，每次更新均会执行，根据返回结果对state进行合并，返回null则不合并，此处的oldState是已经更新过的，但是后续仍然可能会更改；
3、componentWillMount：已废弃，参数（无），方法内如果再次setState会导致状态混乱难以理解；
4、componentDidMount：渲染完成，参数（无），通常用来请求数据；
5、shouldComponentUpdate：组件是否需要更新，参数（newProps、newState、newCtx）；
6、componentWillUpdate：已废弃，参数（newProps、newState、newCtx），组件将要更新；
7、getSnapshotBeforeUpdate：调用render方法之前，参数（prevProps、prevState），更新之前执行，返回结果对象给componentDidUpdate使用；
8、componentDidUpdate：更新完成，参数（prevProps、prevState、snapshot），此处已经完成渲染，故所有值均是前一次渲染的值；
9、componentWillUnmount：即将卸载，参数（无）；
总结：传递的参数其实都是new的，如果后续可能会进行改动，从语义化角度讲应该是old；

##### 1.2.2、执行顺序

1、初次渲染：父new、父willMount、子new、子wllMount、子didMount、父didMount；
2、组件更新：父willReceiveProps、父derivedState、父willUpdate、子willReceiveProps、子derivedState、子willUpdate、父snapshot、子didUpdate、父didUpdate；
3、组件卸载：父willUnmount、子willUnmount；

### 1.3、更新

##### 1.3.1、更新方法

1、setState：将更新内容（state）组织成update对象挂载到组件的updateQueue上，等下一次调度；
2、forceUpdate：将更新内容（state）组织称update对象挂载到组件的updateQueue上，标记其为ForceUpdate类型，等待下次调度，检测是否更新时，scu或ForceUpdate均会进行更新；
3、replaceState：将更新内容（state）组织成update对象挂载到组件的updateQueue上，标记其为ReplaceState状态，等下一次调度；

##### 1.3.2、同步异步

1、何时异步：生命周期方法内，合成事件中；
2、何时同步：setTimeout、原生事件中等；
3、差异原因：在生命周期及合成事件中，会存在更新类型状态；
4、想拿到更新后的值：setState回调、hooks用useEffect依赖；

### 1.4、diff

##### 1.4.1、key作用

1、元素复用：key和type均一致时，dom元素认为可以复用；
2、原地复用：不设置key时，会把其在父元素下索引当做key，和设置成数组下标效果一致；
3、实际用法：推荐设置唯一key，避免设置数组下标；

##### 1.4.2、diff过程

1、遍历新旧fiber：从头往后遍历，若节点不能匹配，跳出循环，否则更新节点信息；
2、新节点比较多：旧节点已经遍历完，等于新增节点，逐个创建新节点；
3、旧节点比较多：新节点已经遍历完，等于移除节点，逐个删除旧节点；
4、新旧均有剩余：将旧节点转成map形式，key或者index作为键，再遍历进行比对；
5、时间复杂度：O(n)，同级比较，深度优先，不进行跨层级比较，因为通常情况下，节点是同层移动比较多；

##### 1.4.3、和vue异同

1、顺序：react从前往后遍历，vue采用头尾交叉比对，vue3采用双向收缩比对（双指针）；
2、map：均会使用map进行查找，react存储的会多一些；
3、深度优先：均是同层比较、深度优先，时间复杂度均是O(n)；

### 1.5、合成事件

1、作用：最大化解决兼容性问题、提高性能（事件代理）、简化事件逻辑（方便统一处理等）；
2、分类：捕获事件（focus、blur、scroll等）、冒泡事件（click、mouseover、mouseleave等）；
3、特性：合成事件晚于原生事件（冒泡阶段，几乎不会影响原生事件），反过来，原生事件阻止冒泡会阻止掉所有合成事件；

### 1.6、context

1、创建：createContext；
2、使用：contextType（class组件，只能用一个ctx）、Consumer（均可使用）、useContext（hooks组件）；

### 1.7、hooks组件

##### 1.7.1、对比class组件

1、class组件问题：组件复用（hoc、render props等，解构时产生多层组件嵌套）、复杂的组件逻辑（生命周期较多，逻辑分散，理解比较吃力）、this指向问题（箭头函数、bind处理，本质上源于react内部执行这些方法并不是使用instance.xxx，另一点是babel转换出来的代码量增加很多，难以优化）；
2、hooks组件优点：易于组件复用（可以拆分很精细）、数据管理解耦（useContext很方便）、易上手理解；
3、hooks组件缺点：闭包问题（使用useEffect解决）、setState回调（使用useEffect解决）、增加心智负担；
4、hooks使用要点：只能在最顶层使用，不能用在if里面，不能用在循环里面，不能用在嵌套函数里面，属性均挂载于fiber的memoizedState属性上构造成单向非循环链表；

##### 1.7.2、effect

1、执行顺序：useLayoutEffect（同步钩子，类似willMount、willUpdate，由依赖决定是否执行） => requestAnimationFrame（MessageChannel回调大概率晚于该方法） => useEffect（异步钩子，类似didMount、didUpdate，由依赖决定是否执行）；
2、执行顺序--父子间：子useLayoutEffect => 父useLayoutEffect => 子useEffect=> 父useEffect；
2、卸载顺序：useLayoutEffect => useEffect；
4、卸载顺序--父子间：父useLayoutEffect => 父useEffect=> 子useLayoutEffect => 子useEffect；

##### 1.7.3、memo

1、memo：类似PureComponent，作用于整个function上；
2、useMemo：hooks钩子，手动控制组件更新依赖；

##### 1.7.4、ref

1、createRef：可用于class组件、hooks组件；
2、useRef：可用于hooks组件；
3、forwardRef：用于转发子组件ref到父组件中；
4、useImperativeHandle：可修改组件的对外暴露的ref对象；

### 1.8、react17版本

1、新版的jsx，不用再默认导入react；
2、事件委托的变更，放到root节点上；
3、去除事件池，异步调用event对象的时候，能够保持访问，17之前，必须调用e.persist()才能存下来；
4、useEffect清理函数变成异步执行；
5、forwardRef、memo不再支持返回undefined；

# 2、redux、mobx

### 2.1、redux

##### 2.1.1、原理

1、核心：compose组合函数（处理中间件、执行reducer）、事件订阅（更新）；

##### 2.1.2、组成

1、store：存储对象，唯一不可变；
2、action：state改变命令，传递给reducer；
3、reducer：action处理器，用于返回新的state数据，纯函数；
4、dispatch：调度器，用于派发action，调用reducer；
5、数据流向：view发出dispatch、store调用reducer、state变化通知（调用subscribe监听函数）、监听函数进行更新（setState方法）、render新的view；

### 2.2、mobx

##### 2.2.1、原理

1、核心：proxy监听数据变化、视图更新；

##### 2.2.2、组成

1、store：存储对象，可以多个；
2、action：更新方法，支持异步，严格模式下需要使用runInAction；
3、reaction：依赖变化监听方法，computed实行懒加载，autorun自动收集依赖，reaction手动添加依赖；
4、数据流向：view发出action、action修改state、state变化通知、render新的view；

### 2.3、区别

1、store：redux使用单一store，mobx可以使用多个store；
2、状态可变：redux遵循不可变状态，使用纯函数返回新的状态，mobx可以修改状态；
3、更新方式：redux使用事件监听及广播来调度视图更新，mobx使用observable可以做到精确更新；
4、状态回溯：redux设计理念是时间旅行，可以回溯历史状态，mobx回溯稍微有点麻烦；
5、组件复用：redux组件通过hoc、props重新组织，组件复用比较麻烦，mobx可以更细粒度拆分组件；
6、开发速度：redux需要写action、reducer比较繁琐，还得配合中间件实现异步action，mobx较为便捷；

### 2.4、异步action

##### 2.4.1、thunk、promise

原理：使用函数组合包装原有的action来实现异步；
缺点：thunk使得redux可以接受函数作为action，导致action不易维护（形式不统一、逻辑分散）；

##### 2.4.2、saga

原理：使用generator函数进行数据获取、逻辑处理、action分发等操作，剥离业务操作和action/creator等；
特点：
		1、获取数据逻辑都写在saga.js里面，不用再写到action里面；
		2、代码类似同步语法，更易读、易调试；
		3、代码异常可以直接捕获；

##### 2.4.3、dva

原理：基于saga，借鉴约定优于配置思想，将state、reducers、effects等拼装到了一起；

# 3、react-router

1、原理：history、prompt；
2、switch缺失：路由能匹配上的均会展示；
3、hash模式：微信回调url后面#部分会被干掉；