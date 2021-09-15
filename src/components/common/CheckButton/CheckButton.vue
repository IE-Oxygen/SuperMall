<template>
  <div class="check-btn" >
    <img :class="{actived: isShowbtn}" src="@/assets/img/cart/tick.svg" >
  </div>
</template>

<script>

export default {
  name: 'Checkbutton',
  props:{
    isShowbtn:{
      type: Boolean,
      default(){
        return false;
      }
    }
  },
  data() {
    return {
    };
  },
  methods: {
   
  },
};
</script>

<style scoped>
img{
  width: 20px;
  display: block;
  border: 1px solid grey;
  background-color: #fff;
  border-radius: 50%;
}
.actived{
  background-color: var(--color-tint);
}
</style>