<template>
  <div class="list">
    <div class="table">
      <div class="row">  
          <div class="th first date">报告日期</div>  
          <div class="th ind">股票代码</div>  
          <div class="th tit">标题</div>  
          <div class="th pjtype">原文评级</div>  
          <div class="th pjchange">评级变动</div>  
          <div class="th last insname">机构名称</div>  
      </div>

      <div class="row" v-for="v in list"> 
        <div class="td">{{v.created_at}}</div>
        <div class="td">{{v.code}}</div>
        <div class="td">
          <p class="title">
            <nuxt-link :to="{name: 'report-id', params: { id: v.id }}">{{v.title}}</nuxt-link>
          </p>
        </div>
        <div class="td">{{v.rate}}</div>
        <div class="td">{{v.change}}</div>
        <div class="td">{{v.insname}}</div>
      </div>  
    </div>

    <el-page :num="last_page" :current="current_page" rname="report"></el-page>
  </div>
</template>

<script>
import axios from '@/plugins/api-axios.js'
import page from '@/components/Page'

export default {
  async asyncData ({route}) {
    var query = route.query
    var formdata = {
      params: {
        pagesize: 50,
        page: query.page
      }
    }

    let { data } = await axios.get('report', formdata)
    return {
      list: data.data.data,
      current_page: data.data.current_page,
      last_page: data.data.last_page
    }
  },
  data: function () {
    return {
      onfold: false,
      page: 1,
      id: 1
    }
  },
  components: {
    'el-page': page
  }
}
</script>

<style lang="scss">
  .table {
    color: #676767;
    display:table;
    border-collapse:separate;
    position: relative;
    width: 100%;

    .row {  
      display:table-row;
      border-spacing:10px;
      overflow: hidden;
      border-radius: 5px;
    }

    .row:hover {
      background-color: #ecf1fb;
    }

    .th, .td {  
      display:table-cell;
      padding: 5px 10px;
      text-align: center;
    }

    .th {
      background-color: #ecedf1;
      color: #777;
      line-height: 25px;
    }

    .date {
      min-width: 110px;
    }

    .ind {
      min-width: 110px;
    }

    .td {
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      min-width: 102px;
    }

    .title {
      height: 30px;
      line-height: 30px;
      overflow: hidden;
    }

    .row .th.first {
      border-radius: 5px 0 0 5px;
    }

    .row .th.last {
      border-radius: 0 5px 5px 0;
    }

    .row .one {  
      width:200px;  
    }  
    .row .two {  
      width:200px;  
    }  
    .row .three {  

    } 
  }
</style>
