<template>
  <div class="home">
    <nav-bar class="home-nav-bar">
      <template v-slot:center><div>购物街</div></template>
    </nav-bar>
    <tab-control ref="tabControl1" v-show="isShowTabControl" :titles="['流行','新款','精选']" class="home-tab-control1" @tabclick="tabclick1"></tab-control>
    <scroll class="wrapper" ref="scroll" 
      :probeType="3" :pullUpLoad="true" 
      @scrollPosition="scrollPosition" 
      @pullingUp="loadMore">
      <home-swiper :banners='banners' ref="homeSwiper" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <hoem-recommend :recommends="recommends" ref="hoemRecommend" @recImgLoad="recImgLoad"></hoem-recommend>
      <tab-control ref="tabControl2" :titles="['流行','新款','精选']" class="home-tab-control2" @tabclick="tabclick2"></tab-control>
      <goods-list :goods="showgoods"></goods-list>
    </scroll>
    <back-top @click.native="topclick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
//引入网络数据请求
import {getHomeMultidata} from '@/network/home.js'
import {getHomeGoods} from '@/network/home.js'

import NavBar from '@/components/common/NavBar/NavBar.vue'
import TabControl from '@/components/content/TabControl.vue'

import HomeSwiper from './child/Homeswiper'
import HoemRecommend from './child/HoemRecommend.vue'
import GoodsList from '@/components/content/GoodsList/GoodsList.vue'
import Scroll from '@/components/common/Scroll/Scroll.vue'

import{imageListenerMixin, backTopMixin} from '@/common/mixin.js'

export default {
  components: { 
    NavBar,
    HomeSwiper,
    HoemRecommend,
    TabControl,
    GoodsList,
    Scroll,
    },
  name:'Home',
  data() {
    return {
      banners: [],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType: 'pop',
      tabControlTop: 0,
      isShowTabControl: false,
      scrollY: 0,
    };
  },
  computed:{
    showgoods(){
      return this.goods[this.currentType].list
    }
  },
  created(){
    //获取轮播图和推荐数据
    this.getHomeMultidata();
    //首次获取home的商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted() {},
  //把监听相关操作抽离到mixin中
  mixins: [imageListenerMixin, backTopMixin],
  activated() {
    this.$refs.scroll.scrollrefresh();
    this.$refs.scroll.scrollTo(0, this.scrollY, 0);
  },
  deactivated() {
    this.scrollY = this.$refs.scroll.getScrollY();
    //离开时取消监听,避免详情页加载触发home的监听
    this.$bus.$off('imgLoad', this.imageLoadListener )
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    /**选择当前商品类型**/
    //t1为下拉后新覆盖的tabcontrol的click事件，实现切换类型时返回首列商品
    tabclick1(index){
      switch(index){
        case(0): 
          this.currentType = 'pop';
          this.$refs.scroll.scrollTo(0, -this.tabControlTop,100);
          break;
        case(1):
          this.currentType = 'new';
          this.$refs.scroll.scrollTo(0, -this.tabControlTop, 100);
          break;
        case(2):
          this.currentType = 'sell';
          this.$refs.scroll.scrollTo(0, -this.tabControlTop, 100);
          break;
      }
      this.$refs.tabControl2.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
    },
    //t2为下拉前的click事件
    tabclick2(index){
      switch(index){
        case(0): 
          this.currentType = 'pop';
          break;
        case(1):
          this.currentType = 'new';
          break;
        case(2):
          this.currentType = 'sell';
          break;
      }
      this.$refs.tabControl2.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
    },
    //滚动位置控制backtop和tabcontrol显示
    scrollPosition(position){
      this.isShowBackTop = -(position.y) > this.tabControlTop;
      this.isShowTabControl = -(position.y) > this.tabControlTop;
    },
    //下拉加载更多
    loadMore(){
      this.getHomeGoods(this.currentType);
    },
    // 获取tab-control的offsetTop
    recImgLoad(){
      this.tabControlTop = this.$refs.tabControl2.$el.offsetTop;
    },
    swiperImgLoad(){
      this.tabControlTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求相关方法
     */
    //请求轮播图和推荐的数据
    getHomeMultidata() {
      getHomeMultidata()
      .then(
      // res => console.log(res)
      res =>{
        //分类保存到data
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
      .catch((err) => console.log(err));
    },
    //请求商品数据，每执行一次，就新增一页该类型的商品数据
    getHomeGoods(type) {
      //想要请求下一页的数据，单独定义变量尝试
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page)
      .then(
        res =>{
          this.goods[type].list.push(...res.data.list);
          // 成功请求，再把data中的page+1
          this.goods[type].page +=1;
        })
      .then(
        //完成一次上拉加载更多
        () => this.$refs.scroll.finishPullUp()
      )
      .catch((err) => {
        console.log(err);
        this.$toast.showToast('首页加载出错',1000);
        this.reload();
      })
    }
  },
}
</script>

<style scoped>
.home-nav-bar{
  background-color: var(--color-tint);
  color: var(--color-background);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2) ;
}
.wrapper{
  height: calc(100vh - 93px);
  background-color: rgb(255, 255, 255);
}
.home-tab-control1{
  position: fixed;
  z-index: 10;
}
</style>