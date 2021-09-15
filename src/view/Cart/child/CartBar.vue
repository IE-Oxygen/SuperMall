<template>
  <div class="cart-bar">
    <div class="left">
      <check-button class="btn" @click.native="checkAll" :isShowbtn="this.$store.state.isTotal"></check-button>
      <span>全选</span>
      <div class="total">合计：</div>
      <div class="total-price">￥{{totalPrice}}</div>
    </div>
    <div class="right">
      <div class="buy" @click="goPay">去结算({{totalNum}})</div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import CheckButton from '@/components/common/CheckButton/CheckButton.vue';

export default {
  name: 'Cartbar',
  components:{
    CheckButton
  },
  data() {
    return {
      flag:true,
    };
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return  this.cartList.filter(item => {
        return item.checked
      }).reduce((pre,item) =>{
        return pre + item.nowPrice * item.count
      },0).toFixed(2);
    },
    totalNum(){
      return  this.cartList.filter(item => {
        return item.checked
      }).length
    },
  },
  methods: {
    checkAll() {
      if(this.flag){
        this.cartList.forEach(item =>{
          item.checked = true;
        })
        this.flag = !this.flag;
      }
      else{
        this.cartList.forEach(item =>{
          item.checked = false;
        })
        this.flag = !this.flag;
      }
      this.$store.state.isTotal = !this.$store.state.isTotal;
    },
    goPay(){
      if(this.totalNum === 0){
        this.$toast.showToast('请选择商品',1000)
      }
    }
  },
};
</script>

<style scoped>
.cart-bar{
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  /* padding-inline: 2%; */
  background-color: rgb(250, 250, 250);
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2) ;
}
.left{
  display: flex;
  align-items: center;
  margin-left: 2%;
}
.btn{
  margin-right: 5px;
}
.total{
  margin-left: 15px;
}
.total-price{
  color:#000;
  font-size: 17px;
  font-weight: 600;
}
.right{
  width:30%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2%;
}
.buy{
  width:100%;
  height: 34px;
  color: #fff;
  text-align: center;
  line-height: 34px;
  background-color: #9999cc;
  border-radius:34px;
}
</style>