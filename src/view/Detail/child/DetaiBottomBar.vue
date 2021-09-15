<template>
  <div class="bottom-bar">
    <div class="logo">
      <div class="store">
        <img src="@/assets/img/detail/bottombar/store.svg">
        <div>店铺</div>
      </div>
      <div class="kefu">
        <img src="@/assets/img/detail/bottombar/wink.svg">
        <div>客服</div>
      </div>
      <div class="collection" @click="collect">
        <img v-if="!isCollect" src="@/assets/img/detail/bottombar/star-0.svg">
        <img v-else src="@/assets/img/detail/bottombar/star-1.svg">
        <div >收藏</div>
        <!-- <div v-else>已收藏</div> -->
      </div>
    </div>
    <div class="btns">
      <div class="add-cart" @click="addToCart" :class="disableClick?'click-disable':''">加入购物车</div>
      <div class="buy">立即购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detaibottombar',
  data() {
    return {
      isCollect:false,
      disableClick:false,
    };
  },
  methods: {
    addToCart(){
      this.$emit('addToCart');
      this.disableClick = true;
      console.log('add');
      setTimeout(() => {
        this.disableClick = false;
      }, 1000);
    },
    collect(){
      this.isCollect = !this.isCollect;
      console.log('sss');
      //发送收藏事件。。。
    },
  },
};
</script>

<style scoped>
.bottom-bar{
  width: 100%;
  height: 49px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  /* padding-inline: 2vw; */
  background-color: #fff;
  font-size: 13px;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.2);

}
.logo{
  display: flex;
  width: 45%;
}
.logo>div{
  flex: 1;
  text-align: center;
  /* padding-block: 5px; */
  margin-block: 5px;
}
img{
  height: 20px;
}
.btns{
  display: flex;
  align-items: center;
  font-size: 14px;
  width: 55%;
  margin-inline: 1%;
}
.btns>div{
  height: 30px;
  width: 50%;
  line-height: 30px;
  text-align: center;
  color: #fff;
  font-weight: 200;
  background-color: var(--color-tint);
}
.add-cart{
  border-bottom-left-radius: 30px;
  border-top-left-radius: 30px;
  border-right: 1px solid #9966cc;
}
.buy{
  border-bottom-right-radius: 30px;
  border-top-right-radius: 30px;
}
.click-disable{
  pointer-events: none;
}
</style>