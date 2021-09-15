<template>
  <div id="app">
    <keep-alive exclude="Detail">
          <router-view  v-if="isRouterAlive"></router-view>
    </keep-alive>
    <maintabbar></maintabbar>
  </div>
</template>

<script>
import Maintabbar from './components/content/Maintabbar.vue'

export default {
  name: 'App',
  components: {
    Maintabbar
  },
  provide() { // 注册一个方法利用route刷新
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      test: 'aaaa',
      isRouterAlive: true
    };
  },
  mounted() {
    // 检测断网
    window.addEventListener("offline", () => {
        console.log("已断网");
        this.$toast.showToast('已断网',3000)
    });
    window.addEventListener("online", () => {
        console.log("网络已连接");
        this.reload();
        this.$toast.showToast('网络已连接',2000)
    });
},
  methods: {
     reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  },
}
</script>

<style>
  @import "./assets/css/base.css";
  
  img[lazy="loading"]{
  display:block;
  width:50px !important;
  margin:0 auto;
  }
</style>
