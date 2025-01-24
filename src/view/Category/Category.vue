<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <template v-slot:center><div>商品分类</div></template>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem">
      </tab-menu>
      <div>
        <tab-control :titles="['综合', '新品', '销量']" @tabclick="tabclick" class="tab-control"></tab-control>
        <scroll id="tab-content" :data="[categoryData]" @scrollPosition="scrollPosition" ref="scroll" :probeType='3'>
          <div>
            <tab-content-category :subcategories="showSubcategory" @imgLoad="imgLoad" :imageLength="imageLength"></tab-content-category>
            <tab-content-detail ref="detail" :categoryDetail="showCategoryDetail"></tab-content-detail>
          </div>
        </scroll>
      </div>
      <back-top @click.native="topclick" v-show="isShowBackTop"></back-top>
    </div>
  </div>
</template>

<script>
  import{imageListenerMixin, backTopMixin} from '@/common/mixin.js'

  import NavBar from '@/components/common/NavBar/NavBar'

  import TabMenu from './childComps/TabMenu'
  import TabControl from '@/components/content/TabControl.vue'
  import Scroll from '@/components/common/Scroll/Scroll'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabContentDetail from './childComps/TabContentDetail'

  import {getCategory, getSubcategory, getCategoryDetail} from "@/network/category";

  export default {
		name: "Category",
    components: {
      NavBar,
      TabMenu,
      TabControl,
      Scroll,
      TabContentCategory,
      TabContentDetail
    },
    mixins: [imageListenerMixin, backTopMixin],
    data() {
      return {
        categories: [],
        categoryData: [],
        currentIndex: -1,
        currentType: 'pop',
        tabControlTop: 0,
        imageLength: 0,
      }
    },
    created() {
      // 1.请求分类数据
      this._getCategory()
    },
    activated() {
      this.$refs.scroll.scrollrefresh();
    },
    //离开时取消监听
    deactivated() {
      this.$bus.$off('imgLoad', this.imageLoadListener )
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {
      _getCategory() {
        getCategory().then(res => {
          // 1.获取分类数据
          this.categories = res.data.category.list
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
        const maitKey = this.categories[index].maitKey;
        getSubcategory(maitKey).then(res => {
          this.categoryData[index].subcategories = res.data
          //这里用于监听subcategories的图片长度
          //通过props传进到子组件进行比较，在最后一个图片加载完成后发送事件imgLoad，再获取高度实现定位跳转
          this.imageLength = res.data.list.length
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail('pop')
          this._getCategoryDetail('sell')
          this._getCategoryDetail('new')
        })
      },
      _getCategoryDetail(type) {
        // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
        getCategoryDetail(miniWallkey, type).then(res => {
          // 3.将获取的数据保存下来
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      /* 事件响应相关的方法 */
      selectItem(index) {
        this._getSubcategories(index)
        this.$refs.scroll.scrollTo(0,0,0)
      },
      tabclick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.scroll.scrollTo(0,-this.tabControlTop,300)
      },
      imgLoad(){
        this.tabControlTop = this.$refs.detail.$el.offsetTop;
        // console.log(this.tabControlTop);
      },
      scrollPosition(position){
        let positionY = -position.y;
        this.isShowBackTop = positionY > this.tabControlTop;
      },
    }
	}
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .tab-control{
    box-shadow: 0 0 0;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }

  #tab-content {
    height: calc(100vh - 93px - 50px) ;
    width: calc( 100vw - 100px);
}
</style>
