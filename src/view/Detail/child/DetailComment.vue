<template>
  <div class="detail-comment">
    <div class="title">
      <div>用户评价<span>({{detailComment.cRate}})</span></div>
      <div class="view-more" v-if="detailComment.cRate !== 0">查看更多 ＞</div>
      <div v-else>暂无评价</div>
      
    </div>
    <div class="comment" v-if="Object.keys(detailComment).length !== 1">
      <div class="user">
        <img class="user-img" :src="detailComment.user.avatar">
        <span class="user-name">{{detailComment.user.uname}}</span>
      </div>
      <div class="content">
        <div class="content-text">{{detailComment.content}}</div>
        <div class="content-add">
          <span>{{detailComment.created | showDate}}</span>
          <span>{{detailComment.style}}</span>    
        </div>
        <div class="content-img" >
          <img v-for="(item, index) in detailComment.Images" :key="index" :src="item" >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from '@/common/utils.js'

export default {
  name: 'Detailcomment',
  props: {
    detailComment:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters: {
    showDate(value){
      const date = new Date(value* 1000);
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  mounted() {
    // console.log(Object.keys(this.detailComment).length)
    // console.log(this.detailComment.cRate);
  },
  
};
</script>

<style scoped>
.detail-comment{
  border-bottom: 5px solid #f2f5f8;
}
.title{
  display: flex;
  justify-content: space-between;
  padding-inline: 2%;
  height: 42px;
  line-height: 40px;
  border-bottom: 2px solid #f2f5f8 ;
}
.title span{
  margin-left: 5px;
  font-size: 14px;
}
.view-more{
  color: var(--color-bright)
}
.comment{
  padding-inline: 5%;
  padding-block: 10px;
}
.user{
  /* display: flex;/ */
  margin-bottom: 15px;
  height: 45px;
}
.user-img{
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid #000;
  vertical-align: middle;
}
.user-name{
  line-height: 45px;
  margin-inline: 10px;
  color: #000;
}
.content-text{
  font-size: 14px;
  margin-bottom: 10px;
}
.content-add{
  font-size: 12px;
  color:#666;
  margin-bottom: 10px;
}
.content-add>span:first-child{
  margin-right: 10px;
}
.content-img{
  display: flex;
}
.content-img img{
  width: 60px;
  height: 60px;
  margin-right: 10px;
}
</style>