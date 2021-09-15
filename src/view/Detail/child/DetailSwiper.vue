<template>
    <!-- v-if确保从网络接收banners数据后才生成轮播图 -->
      <swiper ref="mySwiper" :options="swiperOptions" v-if="topImages.length" >
        <!-- 使用banners，v-for生成轮播图 -->
      <swiper-slide v-for="(item,index) in topImages" :key="index">
          <img :src="item">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
export default {
  name: 'Detailswiper',
  components: {  },
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      // 设置轮播图的API
      swiperOptions:{
        // 设置分页器
        pagination: {el: '.swiper-pagination'},
        // 监视轮播图内容更新
        observer:true,
        observeParents:true,
        loop: true,
        // 设置自动轮播
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        // 速度
        speed:1000,
      },
    };
  },
};
</script>

<style scoped>
.swiper-container{
   width: 100%;
   height: 40vh;
   /* 必须hidden，否则会撑大视图 */
   overflow: hidden;
   position: relative;
   /* 设置分页器颜色 */
    --swiper-pagination-color: var(--color-tint);
  }
.swiper-slide img{
  /* height: 100%; */
  width: 100%;
  
}
  .swiper-pagination{
    /* 设置分页器底部居中 */
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }
</style>