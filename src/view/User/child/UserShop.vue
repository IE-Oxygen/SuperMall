<template>
  <div class="user-shop">
    <div class="top">
      <div v-for="(item, index) in list" :key="index">{{item}}</div>
    </div>
    <div class="all-order">
      <div>我的订单</div>
      <div>查看全部 <img src="@/assets/img/user/right.svg"></div>
    </div>
    <div class="sort">
      <div>
        <img src="@/assets/img/user/truck.svg">
        <span>运输中</span>
      </div>
      <div>
        <img src="@/assets/img/user/pay.svg">
        <span>待付款</span>
      </div>
      <div>
        <img src="@/assets/img/user/comment.svg">
        <span>待评价</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Usershop',
  data() {
    return {
      list:['收藏','足迹','店铺'],
    };
  },
  mounted() {
    
  },
  methods: {
    
  },
};
</script>
<style scoped>
.user-shop{
  width: 100%;
  height: 180px;
  border-radius: 5%;
  box-shadow: 0 0 2px rgba(0,0,0,.25);
}
.top{
  display: flex;
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: #000;
  font-weight: 600;
  border-bottom: 1px solid rgba(102, 102, 102, 0.25);
}
.top div{
  flex: 1;
}
.all-order{
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding-inline: 5%; */
  margin-bottom: 10px;
}
.all-order>div:first-child{
  color: #000;
  font-weight: 600;
  margin-left: 5%;
}
.all-order>div:nth-child(2){
  display: flex;
  font-size: 14px;
  line-height: 20px;
  margin-right: 5%;
}
.all-order>div:nth-child(2) img{
  width: 20px;
}
.sort{
  display: flex;
}
.sort div{
  flex: 1;
  text-align: center;
}
.sort span{
  font-size: 14px;
}
.sort img{
  width: 35px;
  display: block;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  margin-bottom: 5px;
}
</style>