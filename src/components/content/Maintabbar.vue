<template>
  <tab-bar>
    <tab-bar-item path="/home" >
      <template v-slot:iconimg><img src="@/assets/img/tabbar/home1.svg"> <!--不能使用bmp格式 --></template>
      <template v-slot:iconimg-active><img src="@/assets/img/tabbar/home1-active.svg"></template>
      <template v-slot:iconname><div>首页</div></template>
    </tab-bar-item>

    <tab-bar-item path="/category"> 
      <template v-slot:iconimg><img src="@/assets/img/tabbar/th-large1.svg"></template>
      <template v-slot:iconimg-active><img src="@/assets/img/tabbar/th-large1-active.svg"></template>
      <template v-slot:iconname><div>分类</div></template>
    </tab-bar-item>

    <tab-bar-item path="/cart">
      <template v-slot:iconimg><img src="@/assets/img/tabbar/cart.svg"></template>
      <template v-slot:iconimg-active><img src="@/assets/img/tabbar/cart-active.svg"></template>
      <template v-slot:iconname><div>购物车</div></template>
    </tab-bar-item>

    <tab-bar-item path="/user">
      <template v-slot:iconimg><img src="@/assets/img/tabbar/user12.svg"></template>
      <template v-slot:iconimg-active><img src="@/assets/img/tabbar/user12-active.svg"></template>
      <template v-slot:iconname><div>我的</div></template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar';
import TabBarItem from '@/components/common/tabbar/TabBarItem';

export default {
  name:"Maintabbar",
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>