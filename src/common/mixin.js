import {debounce} from './utils.js'
import BackTop from '@/components/common/BackTop/BackTop.vue'


export const imageListenerMixin = {
  data() {
    return {
      imageLoadListener:null,
    };
  },
  mounted() {    
    // console.log("aaa");
    //使用防抖函数
    const refresh = debounce(this.$refs.scroll.scrollrefresh, 500)
    //监听图片加载，注意this
    this.imageLoadListener = () =>{
      refresh();
    }
    this.$bus.$on('imgLoad', this.imageLoadListener);
  },
}
//抽取了点击返回顶部事件，和isShow的flag
//判断何时隐藏显示需要在各个组件自行判断
export const backTopMixin = {
  components:{
    BackTop 
  },
  data() {
    return {
      isShowBackTop: false,
    };
  },
  methods: {
    //点击返回顶部
    topclick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
  },
}
