<template>
  <div class="user-bar">
    <div class="content">
      <img src="/logo.png" class="picture">
      <div class="id"><span>IE-Oxygen</span></div>
    </div>
      <img src="@/assets/img/user/right.svg" class="setting">
  </div>
</template>

<script>
export default {
  name: 'Userbar',
  data() {
    return {
      
    };
  },
  mounted() {
    
  },
  methods: {
    
  },
};
</script>

<style scoped>
.user-bar{
  width:100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: aliceblue; */
  /* box-shadow: 0 0 2px rgba(0, 0, 0, .25); */
}
.picture{
  width: 23%;
  height: 23%;
  border-radius: 50%;
  display: block;
}
.content{
  width: 70%;
  display: flex;
  align-items: center;
}
.id{
  margin-left: 5%;
  font-size: 19px;
  font-weight: 600;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.5;
}
.setting{
  width: 30px;
}
</style>