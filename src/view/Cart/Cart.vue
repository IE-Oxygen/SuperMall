<template>
  <div id="cart">
    <nav-bar class="cart-nav-bar">
      <template v-slot:center><div>购物车({{cartLength}})</div></template>
    </nav-bar>
    <scroll class="wrapper" ref="scroll" :probeType="3">
      <cart-list :cartList="cartList"></cart-list>
    </scroll>
    <cart-bar></cart-bar>
  </div>
</template>


<script>
import {mapGetters} from 'vuex'

import NavBar from '@/components/common/NavBar/NavBar.vue'
import Scroll from '@/components/common/Scroll/Scroll.vue';
import CartList from './child/CartList.vue'
import CartBar from './child/CartBar.vue';

export default {
  name:'Cart',
  components:{
    NavBar,
    CartList,
    Scroll,
    CartBar
  },
  data() {
    return {
      
    };
  },
  //进入界面刷新
  activated() {
    this.$refs.scroll.scrollrefresh();
    //每次进入购物车，对是否全选进行判断，因为新添加进购物车的商品应该是未选中的，全选应该自动失效
    if(this.cartList.length !=0){
      this.$store.state.isTotal =  this.cartList.filter(item => {
        return item.checked
      }).length === this.cartList.length
    }
    
  },
  computed:{
    ...mapGetters(['cartLength','cartList']),
  },
  methods: {
  },
}
</script>

<style>
.cart-nav-bar{
  background-color: var(--color-tint);
  /* background-image: linear-gradient(0deg, #9999cc40, #9999cc); */
  color: #fff;
}
.wrapper{
  height: calc(100vh - 44px - 49px - 44px);
  background-color: #fff;
}
</style>