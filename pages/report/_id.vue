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
        {{time}}
      </span>
    </div>
    <div class="text" v-html="content">
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/api-axios.js'

export default {
  async asyncData ({params}) {
    var url = 'report/' + params.id
    let { data } = await axios.get(url)
    var info = data.data

    return {
      title: info.title,
      content: info.content,
      time: info.created_at
    }
  },
  data: function () {
    return {
      onfold: false,
      ifloading: false,
      page: 1,
      id: 1
    }
  }
}
</script>

<style lang="scss">
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
