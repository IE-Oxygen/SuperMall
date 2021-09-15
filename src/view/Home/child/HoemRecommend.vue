<template>
  <div class="recommend-view" ref="recommendView" v-if="recommends.length">
    <div  class="recommend-item" v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img class="recommend-img" :src="item.image" :alt="item.title" :title="item.title" @load="recImgLoad">
        <div class="recommend-title">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    recommends:{
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
  methods: {
    recImgLoad() {
      if(! this.emitFlag){
        this.$emit('recImgLoad');
        this.emitFlag = true
      }
    },
  },
}
</script>

<style scoped>
.recommend-view{
  width: 100%;
  display: flex;
  /* padding-top: 2%; */
  padding: 2% 0 2% 0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2) ;
}
.recommend-item{
  flex: 1;
  margin-inline: 2%;
}
.recommend-item img{
  width: 100%;
}
.recommend-title{
  text-align: center;
}
</style>