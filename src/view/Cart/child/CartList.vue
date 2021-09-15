<template>
<div>
  <div class="cart-list" v-if="cartList.length">
    <div class="goods" v-for="(item, index) in cartList " :key="index">
      <div class="left">
        <check-button class="btn" @click.native="checkGoods(index)" :isShowbtn="cartList[index].checked"></check-button>
      </div>
      <div class="show">        
        <div class="top">
          <div class="shop-name">
            <img src="@/assets/img/detail/bottombar/store.svg">
            <span>{{item.shopName}}</span>
          </div>
          <div class="delete" @click="deleteGoods(index)">×</div>
        </div>
        <div class="content" @click="inDetail(item.iid)">
          <div class="goods-img">
            <img :src="item.imgURL">
          </div>
          <div class="goods-detail">
            <div class="goods-name">{{item.title}}</div>
            <div class="others">
              <div class="price">￥{{item.nowPrice}}</div>
              <div class="count">x{{item.count}}</div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  </div>
  <div class="no-goods" v-else>
    <div>
      暂无商品
    </div>
  </div>
</div>

  
</template>

<script>
import {mapGetters} from 'vuex'
import CheckButton from '@/components/common/CheckButton/CheckButton.vue';

export default {
  components: { CheckButton },
  
  name: 'Cartlist',
  data() {
    return {
    };
  },
  computed:{
    ...mapGetters(['cartLength', 'cartList'])
  },
  methods: {
    inDetail(iid){
      if(iid){
        this.$router.push({
        path:'/detail' + iid
      })}
    },
    checkGoods(index){
      this.$store.commit('checkGoods', index);
      this.$store.state.isTotal =  this.cartList.filter(item => {
        return item.checked
      }).length === this.cartList.length
    },
    deleteGoods(index){
      this.cartList.splice(index,1);
    }
  },
};
</script>

<style scoped>
.cart-list{
  margin-block: 3%;
  margin-inline: 2%;
}
.goods{
  width: 100%;
  height: 135px;
  display: flex;
  background-color: #9999cc20;
  border-radius: 2%;
  margin-bottom: 5px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
}
.left{
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid purple; */
}

.show{
  width: 90%;
}
.top{
  width: 100%;
  height: 25px;
  line-height: 25px;
  display: flex;
  justify-content: space-between;
}
.shop-name{
  display: flex;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.shop-name img{
  /* width: 25px; */
  margin: 3px;
}
.delete{
  margin-right: 20px;
  font-size: 25px;
  /* font-weight: 600; */
  /* color: #000; */
}
.content{
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
}
.goods-img{
  width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
}
.goods-img img{
  width: 100%;
  display: block;
}
.goods-detail{
  width: calc( 100% - 100px);
  height: 100px;
}
.goods-name{
  width: 100%;
  height: 30px;
  /* padding-inline: 5%; */
  margin-inline: 5%;
  line-height: 30px;
  font-size: 15px;
  font-weight: 500;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.others{
  width: 100%;
  height: 70px;
  display:flex;
  justify-content: space-between;
  align-items: flex-end;
  /* padding-inline: 20px; */
  padding-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
}
.price{
  color: var(--color-high-text);
  margin-left: 20px;
}
.count{
  margin-right: 20px;
}
.no-goods{
  width: 100%;
  height: calc(100vh - 44px - 49px ) ;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
}
</style>