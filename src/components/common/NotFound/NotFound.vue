<template>
  <div class="notfound">
    <div class="center">
      <span>404</span>
      <span>NOT FOUND</span>
      <img src="@/assets/img/tabbar/home1-active.svg" @click="goHome">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notfound',
  data() {
    return {
      
    };
  },

  methods: {
    goHome(){
      this.$router.push('/home')
    }
  },
};
</script>

<style scoped>
.notfound{
  position: fixed;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  color: #9999cc;
  font-size: 25px;
}
.center{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  line-height: 50px;
}
span{
  display: block;
  text-align: center;
}
img{
  display: block;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}
</style>