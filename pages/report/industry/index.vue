<template>
  <div class="container">
    <div class="warp" v-bind:class="[onfold ? 'fold' : 'unfold']">
      <div class="leftwarp transtion">
        <div class="foldbtn">
          <svg class="icon" aria-hidden="true" v-if="!onfold" v-on:click="setfold()">
              <use xlink:href="#icon-menufold"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-if="onfold" v-on:click="setfold()">
              <use xlink:href="#icon-menuunfold"></use>
          </svg>
        </div>
        <ul class="nav">
          <li class="clearfix current">
            <a href="#">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-_TabBar_gongwenbao"></use>
              </svg>
              <span>个股研报</span>
            </a>
          </li>
          <li class="clearfix">
            <a href="#">
               <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-fenlei"></use>
              </svg>
              <span>行业研报</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="rightwarp transtion clearfix">
        <div class="table">
          <el-loading :show="ifloading"></el-loading>
          <div class="row">  
              <div class="th first date">报告日期</div>  
              <div class="th ind">行业名称</div>  
              <div class="th zdf">涨跌幅</div>  
              <div class="th tit">标题</div>  
              <div class="th pjtype">评级类别</div>  
              <div class="th pjchange">评级变动</div>  
              <div class="th last insname">机构名称</div>  
          </div>

          <div class="row" v-for="v in list"> 
            <div class="td">{{dateToday(v.date)}}</div>
            <div class="td">{{v.indname}}</div>
            <div class="td">{{v.fluctuation}}</div>
            <div class="td"><p class="title"><a :href="baseUrl('/report/industry/' + v.id)" v-bind:title="v.title">{{v.title}}</a></p></div>
            <div class="td">{{v.pjtype}}</div>
            <div class="td">{{v.pjchange}}</div>
            <div class="td">{{v.insname}}</div>
          </div>  
        </div>

        <!-- <el-content :id="id"></el-content> -->

        <el-page :num="last_page" :current="current_page" link="/report/industry?page=" @gopage="gopage"></el-page>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import page from '@/components/Page'
import loading from '@/components/Loading'
import content from '@/components/report/industry/Content'

export default {
  async asyncData (context) {
    var query = context.route.query
    var formdata = {
      params: {
        pagesize: 50,
        page: query.page
      }
    }

    let { data } = await axios.get(`http://share.localhost/api/report/industry`, formdata)
    return {
      list: data.data.data,
      current_page: data.data.current_page,
      last_page: data.data.last_page
    }
  },
  data: function () {
    return {
      onfold: false,
      ifloading: false,
      page: 1,
      id: 1
    }
  },
  components: {
    'el-page': page,
    'el-loading': loading,
    'el-content': content
  },
  layout: 'main',
  created: function () {
  },
  methods: {
    dateToday: function (t) {
      t = new Date(t)
      return t.getFullYear() + '年' + t.getMonth() + '月' + t.getDay() + '日'
    },
    setfold: function () {
      this.onfold = !this.onfold
    },
    // 翻页
    gopage: function (page) {
      this.page = page
      this.get()
    },
    get: function () {
      this.ifloading = true // 显示loading
      var vm = this
      var formData = {
        params: {
          page: vm.page
        }
      }
      axios.get(`http://share.localhost/api/report/industry`, formData)
        .then(function (res) {
          vm.current_page = vm.page
          vm.list = res.data.data.data
          vm.ifloading = false // 隐藏loading
        })
    },
    single: function (id) {

    },
    baseUrl: function (href) {
      return process.env.baseUrl + href
    }
  }
}
</script>

<style lang="scss">
  .container {
    
  }

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

  $leftwidth: 180px; // 左侧折叠宽度
  $leftfoldwidth: 58px; // 左侧展开宽度

  .warp {
    position: relative;
  }

  .unfold {
    .leftwarp {
      width: $leftwidth;
    }

    .rightwarp {
      margin-left: $leftwidth;
    }
  }

  .fold {
    .leftwarp {
      width: $leftfoldwidth;
    }

    .rightwarp {
      margin-left: $leftfoldwidth;
    }

    .nav span {
      opacity: 0;
    }
  }

  .leftwarp {
    float: left;
    height: 100%;
    border-right: 1px solid #ecedf1;
    position: absolute;

    .foldbtn {
      height: 45px;
      padding: 0 20px;
      color: #4a70d6;
      font-size: 19px;

      .icon {
        margin: 13px 0 13px 0;
        cursor: pointer;
      }
    }

    .nav {
      li {
        width: 100%;
        height: 45px;
        overflow: hidden;

        a {
          padding: 0 20px;
          line-height: 45px;
          color: #5d5d5d;
          display: block;
        }
      }

      li.current, li:hover {
        border-right: 1px solid #4a6fd6;
        box-sizing: content-box;

        a {
          background-color: #ecf1fb;
          color: #4a70d6;
        }
      }

      .icon {
        color: #4a6fd7;
        font-size: 19px;
        float: left;
        margin: 13px 15px 13px 0;
      }
    }
  }

  .rightwarp {
    margin-left: $leftwidth;
    padding: 15px;
  }
  
</style>
