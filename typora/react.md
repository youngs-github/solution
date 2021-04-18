# 1、核心

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

### 1.2、生命周期

1、componentWillReceiveProps：已废弃，参数（newProps、newCtx），组件props变化时执行，初始化时不执行；
2、getDerivedStateFromProps：替代上面，参数（newProps、oldState），每次更新均会执行，根据返回结果对state进行合并，返回null则不合并，此处的oldState是已经更新过的，但是后续仍然可能会更改；
3、componentWillMount：已废弃，参数（无），方法内如果再次setState会导致状态混乱难以理解；
4、componentDidMount：渲染完成，参数（无），通常用来请求数据；
5、shouldComponentUpdate：组件是否需要更新，参数（newProps、newState、newCtx）；
6、componentWillUpdate：已废弃，参数（newProps、newState、newCtx），组件将要更新；
7、getSnapshotBeforeUpdate：调用render方法之前，参数（prevProps、prevState），更新之前执行，返回结果对象给componentDidUpdate使用；
8、componentDidUpdate：更新完成，参数（prevProps、prevState、snapshot），此处已经完成渲染，故所有值均是前一次渲染的值；
9、componentWillUnmount：即将卸载，参数（无）；

