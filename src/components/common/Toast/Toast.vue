<template>
  <transition name="fade">
    <div class="toast" v-if="isShow">
      <span>{{message}}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      message:'',
      isShow:false,
    };
  },
  methods: {
    showToast(message, delay){
      this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
        this.message = '';
        },delay)
    }
  },
};
</script>

<style scoped>
.toast{
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform:translate(-50%,-50%);
  padding: 15px;
  text-align: center;
  color: #fff;
  font-size: 17px;
  background-color: rgba(0, 0, 0, 0.7);
}
/* 设置持续时间和动画函数 */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-leave-to{
  opacity: 0;
}
</style>