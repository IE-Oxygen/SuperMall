<template>
  <div>
    <div class="back-top">
      <img class="back-top-icon" src="@/assets/img/backtop/backtop.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Backtop',

  data() {
    return {
      
    };
  },

};
</script>

<style scoped>
.back-top{
  position: fixed;
  right: 1%;
  bottom: 60px;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  border: 2px solid var(--color-tint);
}
.back-top-icon{
  display: block;
  width: 2.5rem;
}
</style>