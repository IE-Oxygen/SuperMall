<template>
  <div id="detail">
    <loading></loading>
    <detail-nav-bar ref="nav" @tabClick="tabClick" :disableClick="disableClick"></detail-nav-bar>
    <scroll class="wrapper" ref="scroll" :probeType="3" @scrollPosition="scrollPosition">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop :shop="shop"></detail-shop>
      <detail-goods-info ref="info" :detailInfo="detailInfo" @imgLoad="goodsImgLoad"></detail-goods-info>
      <detail-goods-params ref="params" :detailParams="detailParams"></detail-goods-params>
      <detail-comment ref="comment" :detailComment="detailComment"></detail-comment>
      <goods-list ref="recommends" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="topclick" v-show="isShowBackTop"></back-top>
    <detai-bottom-bar @addToCart="addToCart"></detai-bottom-bar>
  </div>
</template>

<script>
// 网络请求相关
import {getDetail, Goods, Shop, DetailParam} from '@/network/detail.js'
import {getRecommend} from '@/network/recommend.js'

import Scroll from '@/components/common/Scroll/Scroll.vue';
import{imageListenerMixin, backTopMixin} from '@/common/mixin.js'
// import {debounce} from '@/common/utils.js'

import DetailNavBar from './child/DetailNavBar.vue';
import DetailSwiper from './child/DetailSwiper.vue';
import DetailBaseInfo from './child/DetailBaseInfo.vue';
import DetailShop from './child/DetailShop.vue';
import DetailGoodsInfo from './child/DetailGoodsInfo.vue';
import DetailGoodsParams from './child/DetailGoodsParams.vue';
import DetailComment from './child/DetailComment.vue';
import GoodsList from '@/components/content/GoodsList/GoodsList.vue';
import DetaiBottomBar from './child/DetaiBottomBar.vue';
import Loading from '@/components/common/Loading/Loading.vue'

export default {
  //此处的name与keep-alive的exclude有关
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper, 
    DetailBaseInfo, 
    DetailShop, 
    Scroll, 
    DetailGoodsInfo, 
    DetailGoodsParams, 
    DetailComment, 
    GoodsList,  
    DetaiBottomBar,
    Loading,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      detailParams: {},
      // 初始化评论数
      detailComment:{
        cRate: 0
      },
      recommends: [],
      themeTopYs: [],
      gethemeTopYs: null,
      currentIndex: null,
      disableClick: true,
      isLoad:false,
      message: '',
      isShowToast: false, 
    };
  },
  inject: ['reload'],
  created(){
    this.iid = this.$route.params.iid;
    this.getDetail(this.iid);
    //网络请求随机获取推荐信息
    //不过由于后端的原因，不同页数的内容都是一样的
    // let page = this.random(1,100)
    getRecommend(1).then(res =>{
      this.recommends = res.data.list;
    })
    //获取各模块高度
    this.gethemeTopYs = function(){
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.info.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }
  },
  mounted() { },
  //把监听相关操作抽离到mixin中
  mixins: [imageListenerMixin, backTopMixin],
  destroyed() {
    //即使destroyed了，事件总线还是能进行监听
    //离开时取消监听,避免home的加载触发详情页的监听
    this.$bus.$off('imgLoad', this.imageLoadListener )
  },
  
  methods: {
    //网络请求相关方法
    getDetail(iid){
      getDetail(iid)
      .then(
        res =>{
          this.topImages = res.result.itemInfo.topImages;
          this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services);
          this.shop = new Shop(res.result.shopInfo);
          this.detailInfo = res.result.detailInfo;
          this.detailParams = new DetailParam(res.result.itemParams.info,res.result.itemParams.rule);
          if(res.result.rate.cRate != 0)
            this.detailComment = res.result.rate.list[0];
          this.detailComment.cRate = res.result.rate.cRate;
        })
      .then(() => {this.isLoad = !this.isLoad})
      .catch((err) => {
        console.log(err);
        this.$toast.showToast('详情页加载出错',1000);
        this.$router.go(-1)
      });

    },
    //监听事件相关方法
    //监听详情图片加载，只会在加载完最后一张图四触发一次
    goodsImgLoad(){
      this.$refs.scroll.scrollrefresh();
      //加载完详情页即可准确获取各模块高度
      this.gethemeTopYs();
      //通过props传递到nav子组件，图片加载完再启用导航栏点击跳转功能,但返回不受限
      this.disableClick = false;
    },
    //监听点击，实现和导航栏的联动
    tabClick(index){
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] ,200)
    },
    //监听滚动，实现和导航栏的联动，并控制topback显示
    scrollPosition(position){
      let positionY = -position.y;
      for(let i=0; i<this.themeTopYs.length-1; i++){
        if(this.currentIndex !== i && ( positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i+1]))
        {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.isShowBackTop = positionY > this.themeTopYs[1];
    },
    //添加购物车
    addToCart(){
      //防止为加载完就添加到购物车
      if(this.isLoad){
        // 1.创建对象
        const obj = {}
        // 2.对象信息
        obj.iid = this.iid;
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.shopName = this.shop.name;
        obj.nowPrice = this.goods.nowPrice;
        obj.checked = false;
        //提交到vuex,并返回对应的提示信息
        this.$store.dispatch('addCart',obj).then(
          res=>{this.$toast.showToast(res,1000)})
      }else
      this.addToCart();
    },
    //随机数生成器
    random(min,max) {
      const num = Math.floor(Math.random() * (max - min)) + min;
      return num;
    },
  },
};
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.wrapper{
  height: calc(100vh - 44px - 49px);
    /* height: calc(100vh - 93px); */
}
</style>