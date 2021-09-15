<template>
  <div class="param-info" v-if="Object.keys(detailParams).length !== 0">
    <div class="size">
      <table v-for="(table, index) in detailParams.sizes"
            class="info-size" :key="index">
        <tr v-for="(tr, indey) in table" :key="indey" class="size-key">
          <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
        </tr>
      </table>
    </div>
    <div class="param">
      <table class="info-param">
        <tr v-for="(info, index) in detailParams.infos" :key="index">
          <td class="info-param-key">{{info.key}}</td>
          <td class="param-value">{{info.value}}</td>
        </tr>
      </table>
    </div>
    <div class="info-img" v-if="detailParams.image.length !== 0">
      <img :src="detailParams.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detailgoodsparams',
  props:{
    detailParams:{
      type:Object,
      default(){
        return {};
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
.param-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

.param-info table {
    width: 100%;
    border-collapse: collapse;
  }

.param-info table tr {
    height: 42px;
  }

.param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

.info-param-key, .size-key>:first-child {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }
.param{
  margin-top: 10px;
  }

.info-param {
    border-bottom: 1px solid #9999cc80;
  }

.param-value {
    color: var(--color-bright)
  }

.info-img img {
    width: 100%;
  }
</style>