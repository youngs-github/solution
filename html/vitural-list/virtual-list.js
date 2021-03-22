/**
 * 虚拟列表组件
 * 原理：利用其它dom撑开父元素, 产生基本滚动效果, 根据scrollTop计算当前索引
 * 注意点：列表元素的父元素需使用absolute或fixed脱离文档流, 减少渲染负担
 * 其他点：若需进一步考虑削减基本开销, 可以重复利用原有item元素(即key设置为索引), 亦可考虑添加节流效果(实时性不是很高)
 */
Vue.component('virtual-list', {
  data() {
    return {
      // 开始下标
      start: 0,
      // 每页容量
      size: 10,
      // 单条高度
      height: 36
    };
  },
  methods: {
    // 滚动事件
    scroll({ target: { scrollTop } }) {
      // 计算start
      this.start = Math.round(scrollTop / this.height);
    },
    // 获取数据
    getList() {
      const { start, size } = this;
      return this.$list.slice(start, start + size);
    },
    // 获取高度
    getHeight() {
      return {
        height: `${this.$list.length * this.height}px`
      };
    },
    // 滚轮事件
    mousewheel({ wheelDelta }) {
      this.$el.scrollTop += wheelDelta > 0 ? -100 : 100;
    }
  },
  mounted() {
    // 计算填充容量
    this.size = ((this.$el.offsetHeight / this.height) >> 0) + 1;
  },
  template: `
    <div class="wrapper" @scroll="scroll">
      <div class="list" @mousewheel="mousewheel">
        <div class="item" v-for="(item, i) in getList()" :key="item.id">
          <div class="tag">{{item.id}}</div>
          <div class="left">{{item.left}}</div>
          <div class="name">{{item.name}}</div>
          <div class="right">{{item.right}}</div>
        </div>
      </div>
      <div class="heightfull" :style="getHeight()"></div>
    </div>
    `
});
