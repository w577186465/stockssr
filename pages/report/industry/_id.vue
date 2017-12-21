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
            <nuxt-link :to="{name: 'report'}">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-_TabBar_gongwenbao"></use>
              </svg>
              个股研报
            </nuxt-link>
          </li>
          <li class="clearfix">
            <nuxt-link :to="{name: 'report-industry'}">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-fenlei"></use>
              </svg>
              行业研报
            </nuxt-link>
          </li>
        </ul>
      </div>

      <div class="rightwarp transtion clearfix">
        <div class="content">
          <h1>{{title}}</h1>
          <div class="info">
            <span class="time">
              <i>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-shijian5"></use>
                </svg>
              </i>
              {{time}}
            </span>
          </div>
          <div class="text" v-html="content">
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import page from '@/components/Page'
import loading from '@/components/Loading'

export default {
  async asyncData ({params}) {
    var url = process.env.apiUrl + '/report/industry/'
    let { data } = await axios.get(url + params.id)
    var info = data.data
    return {
      title: info.title.replace(/&sbquo;/g, '，'),
      content: info.content,
      time: info.date
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
    'el-loading': loading
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

    }
  }
}
</script>

<style lang="scss">
  .container {
    
  }

  // 正文部分
  .content {
    margin: 20px 0;
    padding: 0 20px;

    h1 {
      margin-bottom: 20px;
      font-size: 24px;
      color: #576898;
    }

    .info {
      margin-bottom: 15px;

      .time {
        color: #676767;
      }

      .time i {
        font-size: 16px;
      }
    }

    .text {
      font-size: 16px;
      color: #444;
      line-height: 28px;

      p {
        margin-bottom: 10px;
      }
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
