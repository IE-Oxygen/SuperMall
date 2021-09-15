<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <div class="showrefresh">正在刷新</div>
      <slot></slot>
    </div>
  </div>
</template>

<script>

import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props:{
    probeType:{
      type:Number,
      default(){
        return 2;
      }
    },
    pullUpLoad:{
      type:Boolean,
      default(){
        return false;
      }
    }
  },
  data() {
    return {
      scroll
    };
  },
  methods: {
    scrollTo(x, y, time=300) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp(){
      this.scroll.finishPullUp();
    },
    scrollrefresh(){
      this.scroll.refresh();
      // console.log('aaa');
    },
    getScrollY(){
      return this.scroll.y
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      mouseWheel: true,
      click: true,
    })
    //监听滚动位置
    if(this.probeType === 2 || this.probeType ===3){
      this.scroll.on('scroll',position => {
        this.$emit('scrollPosition', position);
      })
    }

    //监听上拉事件
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',() =>{
        this.$emit('pullingUp');
      })
    }
      
  }
}

</script>

<style scoped>
.wrapper{
  overflow: hidden;
}
.content{
  position: relative;
}
.showrefresh{
  position: absolute;
  width: 100%;
  top: -30px;
  text-align: center;
}
</style>