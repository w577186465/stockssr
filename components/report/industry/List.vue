<template>
  <div class="list">
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
        <div class="td"><p class="title"><a href="#" v-bind:title="v.title">{{v.title}}</a></p></div>
        <div class="td">{{v.pjtype}}</div>
        <div class="td">{{v.pjchange}}</div>
        <div class="td">{{v.insname}}</div>
      </div>
    </div>
    <el-page :num="last_page" :current="current_page" link="/report/industry?page=" @gopage="gopage"></el-page>
  </div>
</template>

<script>
import axios from 'axios'
import page from '@/components/Page'
import loading from '@/components/Loading'

export default {
  props: {
    id: Number,
    listdata: {
      type: Array,
      default: []
    },
    currentPage: {
      type: Number,
      default: 1
    },
    lastPage: Number
  },
  data () {
    return {
      title: null,
      list: this.current_page,
      current_page: this.currentPage,
      last_page: this.last_page,
      page: 1,
      ifloading: false
    }
  },
  components: {
    'el-page': page,
    'el-loading': loading
  },
  created: function () {
    this.get()
  },
  watch: {
    id: function () {
      this.get()
    }
  },
  methods: {
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
    // 翻页
    gopage: function (page) {
      this.page = page
      this.get()
    },
    dateToday: function (t) {
      t = new Date(t)
      return t.getFullYear() + '年' + t.getMonth() + '月' + t.getDay() + '日'
    }
  }
}
</script>