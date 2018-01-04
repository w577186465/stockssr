<template>
  <div class="content">
    <h1>{{title}}</h1>
    <div class="info">
      <span class="time">
        <i>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shijian5"></use>
          </svg>
        </i>
        {{info.created_at}}
      </span>
    </div>
    <div class="text" v-html="info.content">
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/api-axios.js'
import page from '@/components/Page'

export default {
  async asyncData ({params}) {
    var url = 'report/industry/' + params.id
    console.log(url)
    let { data } = await axios.get(url)
    var info = data.data
    return {
      info: info,
      title: info.title.replace(/&sbquo;/g, '，')
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
      var formData = {
        params: {
          page: this.page
        }
      }
      axios.get('report/industry', formData)
        .then(res => {
          this.current_page = this.page
          this.list = res.data.data.data
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
</style>
