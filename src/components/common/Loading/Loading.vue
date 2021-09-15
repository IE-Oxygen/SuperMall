<template>
  <div class="loading" v-show="$store.state.isLoading">
    <span class="text">Loading...</span>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {
      
    };
  },
  methods: {
    
  },
};
</script>
<style scoped>
.loading{
  position: fixed;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  color: #9999cc;
  font-size: 20px;
}
.text{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}
</style>