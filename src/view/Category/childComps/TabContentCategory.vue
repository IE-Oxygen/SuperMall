<template>
  <div>
    <grid-view :cols="3" :lineSpace="15" :v-margin="10">
      <div class="item" v-for="(item, index) in subcategories.list" :key="index">
        <a :href="item.link">
          <img class="item-img" :src="item.image" @load="imgLoad">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
  import GridView from '@/components/common/gridView/GridView'

  export default {
    name: "TabContentCategory",
    components: {
      GridView
    },
    props: {
      subcategories: {
        type: Object,
        default() {
          return {}
        }
      },
      imageLength:{
        type:Number,
      }
    },
    data() {
      return {
        imgCount: 0,
        // imageLength: 0,
      };
    },
    methods: {
      imgLoad(){
        this.imgCount++;
        // console.log(this.imageLength);
        if(this.imgCount === this.imageLength){
          this.$emit('imgLoad');
          this.imgCount = 0;
          // this.imageLength = 0;
        }
      }
    },
    watch:{
      //直接监听会报错，说subcategories是undefined，估计和父组件的计算属性有关系
      //所以这里监听图片长度，是通过直接在父组件数据请求时就获得长度imageLength，然后通过props传进来子组件进行比较
      // subcategories(){
      //   this.imageLength = this.subcategories.list.length;
      // }
    }
  }
</script>

<style scoped>
  .panel img {
    width: 100%;
  }

  .item {
    text-align: center;
    font-size: 12px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>
