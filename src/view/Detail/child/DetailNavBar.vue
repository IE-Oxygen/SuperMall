<template>
  <div class="detail-nav">
    <nav-bar>
      <template v-slot:left>
        <div class="detail-nav-l" @click="returnGoods">
          <img src="@/assets/img/detail/left.svg" >
        </div>
      </template>
      <template v-slot:center>
        <div class="detail-nav-c" :class="disableClick?'click-disable':''">
          <div v-for="(item, index) in title" :key="index" 
            @click="clickActive(index)">
           <span :class="{isActive: currentIndex === index}"> {{item}} </span> 
          </div>
        </div>
      </template>
      <template v-slot:right>
        <div class="detail-nav-r" >
          <img src="@/assets/img/detail/cart.svg" @click="goCart">
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>

import NavBar from '@/components/common/NavBar/NavBar.vue';
export default {
  name: 'VueDetailnavbar',

  components: { NavBar },
  props:{
    disableClick:{
      type:Boolean,
      default(){
        return true;
      }
    }
  },
  data() {
    return {
      title:['商品','详情','评价','推荐'],
      currentIndex: 0
    };
  },

  methods: {
    clickActive(index){
      this.currentIndex = index;
      this.$emit('tabClick', index);
    },
    returnGoods(){
      this.$router.go(-1);
    },
    goCart(){
      //注意大小写
      this.$router.push('/cart');
    }
  },
};
</script>

<style scoped>
.detail-nav{
  background-color: #fff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2) ;
}
.detail-nav-l{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.detail-nav-l img{
  display: block;
  width: 1.5rem;
}
.detail-nav-c{
  display: flex;
  font-weight:500;
}
.detail-nav-c div{
  flex: 1;
}
.detail-nav-r{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.detail-nav-r img{
  display: block;
  width: 1.2rem;
}
.isActive{
  padding: 10%;
  color: var(--color-bright);
  border-bottom: 2px solid var(--color-bright) ;
}
.click-disable{
  pointer-events: none;
}
</style>