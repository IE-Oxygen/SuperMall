<template>
      <div class="tab-bar-item" @click="itemClick">
        <!-- 插槽插入图标 -->
      <div v-if="!isActive"><slot name="iconimg"></slot> </div>
      <div v-else><slot name="iconimg-active"></slot></div>
        <!-- 插槽插入文字 -->
      <div :style="activeStyle"><slot name="iconname"></slot></div>  
      </div>
</template>

<script>
export default {
  name: 'CodeTabBarItem',
  props:{
    path: String,
    // 对象写法，限定类型，设定默认值
    activeColor:{
      type:String,
      default:'#9966CC'
    }
  },
  data() {
    return {
      // Active: true,
    };
  },
  computed:{
    // 通过每个Item的props的path属性值与当前活跃的路由路径比较，来确定哪个Item组件处于活跃状态
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    //将文字div的style属性与计算属性activeStyle绑定
    //通过isActive确定活跃时返回的具体样式
    //color样式由每个Item的props的activeColor属性传入的值决定
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods:{
    // 点击事件跳转路由
    itemClick(){
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
 .tab-bar-item{
   flex: 1;
   text-align: center;
   height: 49px;
   font-size: 14px;
   line-height: 1.5;
 }
 .tab-bar-item img {
   height: 20px;
   vertical-align: middle;
   margin: 3px 0 3px 0;
 }
</style>