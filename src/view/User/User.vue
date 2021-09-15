<template>
  <div id="user">
    <scroll class="scroll" ref="scroll" :probeType="3">
      <user-bar class="user-bar"></user-bar>
      <user-shop class="user-shop"></user-shop>
      <goods-list ref="recommends" :goods="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
import {getRecommend} from '@/network/recommend.js'
import{imageListenerMixin} from '@/common/mixin.js'

import UserBar from './child/UserBar.vue'
import UserShop from './child/UserShop.vue'
import GoodsList from '@/components/content/GoodsList/GoodsList.vue';
import Scroll from '../../components/common/Scroll/Scroll.vue';

export default {
  components: { UserBar, UserShop, GoodsList, Scroll, },
  name:'User',
  data() {
    return {
      recommends:[],
    };
  },
  //监听recommend图片加载后刷新
  mixins: [imageListenerMixin],
  created() {
      //网络请求随机获取推荐信息
      let page = this.random(1,50)
      getRecommend(page).then(res =>{
      this.recommends = res.data.list;
    })
  },
  deactivated() {
    //即使destroyed了，事件总线还是能进行监听
    //离开时取消监听,避免home的加载触发详情页的监听
    this.$bus.$off('imgLoad', this.imageLoadListener )
  },
  methods: {
    //随机数生成器
    random(min,max) {
      const num = Math.floor(Math.random() * (max - min)) + min;
      return num;
    },
  },
  
}
</script>

<style scoped>
#user{
  padding: 10px 5% 0 5%;
}
.user-bar{
  margin-bottom: 20px;
}
.user-shop{
  margin-bottom: 10px;
  background-color: #9999cc20;
}
.scroll{
  height: calc(100vh - 49px);
}
</style>