<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index"
    class="tab-control-item" :class="{active: index === currentIndex}"
    @click="clickActive(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueTabcontrol',
  props:{
    titles:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex:0,
    };
  },
  methods: {
    clickActive(index) {
      this.currentIndex = index;
      //告知home组件当前点击的类型，展示相应类型的商品
      this.$emit('tabclick', index);
    },
  },
};
</script>

<style scoped>
.active{
  color: var(--color-tint);
}
.active span{
  border-bottom: 3px solid var(--color-tint);
}
.tab-control{
  display: flex;
  width: 100%;
  height: 50px;
  line-height: 40px;
  background-color: #fff;
  box-shadow: 0px -1px 2px #9999cc8c;
}
.tab-control-item{
  flex: 1;
  text-align: center;
  padding: 5px;
}
.tab-control-item span{
  padding: 5px 8px 5px 8px;
  font-size: 15px;
}
</style>