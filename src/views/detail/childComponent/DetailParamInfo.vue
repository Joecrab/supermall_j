<template>
  <div class="param" v-if="Object.keys(paramsInfo).length !== 0">
      <table class="set">
          <tr v-for="(item,index) in paramsInfo.set" :key="index">
              <td class="info-param-key">{{paramsInfo.set[index].key}}</td>
              <td>{{paramsInfo.set[index].value}}</td>
          </tr>
      </table>
      <table class="info-table">
          <tr v-for="(item,index) in paramsInfo.tables[0]" :key="index">
              <td v-for="(item1,index1) in paramsInfo.tables[0][index]" :key="index1">
                  {{paramsInfo.tables[0][index][index1]}}
              </td>
          </tr>
      </table>
  </div>
</template>

<script>
export default {
    name: 'DetailParamInfo',
    props: {
        paramsInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    }
}
</script>

<style>
  .param {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }
  .param table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
      color: var(--color-tint);
  }
  .param table tr {
      height: 42px;
  }
  .param table tr td {
      border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .param table tr td:first-child {
      width: 80px;
      color: grey;
  }
   .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }
  .set {
      border-top: 1px solid rgba(0,0,0,.1);
  }
</style>