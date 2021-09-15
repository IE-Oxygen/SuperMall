<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CodeTabbar'
}
</script>

<style scoped>
  .tab-bar{
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(223, 223, 223);
    box-shadow: 0px -1px 2px rgba(0, 0, 0, 0.2) ;
    }
</style>