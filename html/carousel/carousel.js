/**
 * 轮播图组件
 * 原理：[3,1,2,3,1]构造dom元素, 对其父元素进行transform变换, 当下标遇到0或length时, 取消动画并置为其反向元素
 */
Vue.component('carousel', {
  data() {
    return {
      // 下标
      index: 0,
      // 子元素宽度
      width: 0,
      // 防抖
      timer: 0,
      // 选中下标
      select: null,
      // 时间间隔
      interval: 300
    };
  },
  created() {
    // 克隆元素
    this.list = [
      this.$list[this.$list.length - 1],
      ...this.$list,
      this.$list[0]
    ];
    this.select = this.$list[0].id;
  },
  mounted() {
    // 计算宽度
    this.width = this.$el.offsetWidth;
    this.$refs.itemsRef.style.width = `${this.width * this.list.length}px`;
  },
  methods: {
    // 获取子元素样式
    getStyle(index) {
      return {
        width: `${this.width}px`,
        transform: `translateX(${(index - 1) * this.width}px)`
      };
    },
    // 选中前/后一个元素
    selectCurr(n) {
      // 节流
      if (this.timer) return;
      this.index += n;
      this.changeItem();
    },
    // 选中当前第n个元素
    selectItem(n) {
      // 节流
      if (this.timer) return;
      this.index = n;
      this.changeItem();
    },
    // 改变当前选中元素
    changeItem() {
      const { index, width, $list, interval } = this;
      // 当前选中
      this.select =
        $list[
          index < 0
            ? index + $list.length
            : index < $list.length
            ? index
            : index - $list.length
        ].id;
      // 改变
      this.$refs.itemsRef.style.transition = 'transform 300ms linear';
      this.$refs.itemsRef.style.transform = `translateX(${-index * width}px)`;
      // 延时
      this.timer = setTimeout(() => {
        this.timer = 0;
        if (this.index < 0) {
          // 到达左侧边界, 换到右侧
          this.index = $list.length - 1;
          this.$refs.itemsRef.style.transition = 'none';
          this.$refs.itemsRef.style.transform = `translateX(${
            -this.index * width
          }px)`;
        } else if (this.index >= $list.length) {
          // 到达右侧边界, 换到左侧
          this.index = 0;
          this.$refs.itemsRef.style.transition = 'none';
          this.$refs.itemsRef.style.transform = `translateX(${
            -this.index * width
          }px)`;
        }
      }, interval);
    }
  },
  template: `
    <div class="slider">
      <div class="items" ref="itemsRef">
        <div class="item" v-for="(item,i) in list" :style="getStyle(i)" :key="i">
          <div>{{item.name}}</div>
        </div>
      </div>
      <div class="dots">
        <ul class="dots-list">
          <li v-for="(item,i) in $list" :class="{selected: item.id===select}" :key="i">
            <button @click="selectItem(i)"></button>
          </li>
        </ul>
      </div>
      <div class="btns">
        <button class="prev" @click="selectCurr(-1)">前</button>
        <button class="next" @click="selectCurr(1)">后</button>
      </div>
    </div>
  `
});
