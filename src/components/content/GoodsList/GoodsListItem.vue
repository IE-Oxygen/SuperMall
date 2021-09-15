<template>
  <div class="gooods-list-item">
    <div class="goods-list-item-indetail"  @click="inDetail">
      <img v-lazy="showImage" @load="imgLoad">
      <p>{{goodsItem.title}}</p>
    </div>
    <div class="gooods-list-item-content">
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect" @click="collect">
        <img v-if="!isCollect" src="@/assets/img/home/star-0.svg">
        <img v-else src="@/assets/img/home/star-1.svg">
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueGoodslistitem',
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {};
      }
    }
  },
  data() {
    return {
      isCollect: false
    };
  },
  methods: {
    imgLoad() {
      this.$bus.$emit('imgLoad')
    },
    collect(){
      this.isCollect = !this.isCollect;
      //发送收藏事件。。。
    },
    inDetail(){
      if(this.goodsItem.iid){
        this.$router.push({
        path:'/detail' + this.goodsItem.iid
      })}
    }
  },
  computed:{
    showImage(){
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img;
    }
  }
};
</script>

<style scoped>
.gooods-list-item{
  width: 45%;
  margin-bottom: 2%;
}
.goods-list-item-indetail img{
  width: 100%;
  border-radius: 2%;
  display: block;
}
.gooods-list-item-content{
  width: 100%;
  text-align: center;
}
.gooods-list-item p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.5;
}
.gooods-list-item-content span{
  padding: 10px;
}
.gooods-list-item-content .price{
  color: var(--color-high-text);
}
.gooods-list-item-content  img{
  width: var(--font-size);
}
</style>