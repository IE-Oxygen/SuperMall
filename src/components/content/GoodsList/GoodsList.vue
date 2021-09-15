<template>
  <div class="goods-list">
    <goods-list-item v-for="(item, index) in goods" :key="index" :goodsItem="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue';
export default {
  name: 'Goodslist',

  components: {GoodsListItem  },
  props:{
    goods:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  data() {
    return {
      
    };
  },

};
</script>

<style scoped>
.goods-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-top: 10px;
}
</style>