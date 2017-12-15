<template>
  <div>
    <el-menu/>
    <nuxt/>
  </div>
</template>

<script>
import axios from 'axios'
import Menu from '~/components/Menu.vue'

export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`http://api.share.localhost/api/report/industry`)
    return { list: data.data }
  },
  layout: 'default',
  components: {
    'el-menu': Menu
  },
  methods: {
    dateToday: function (t) {
      t = new Date(t)
      return t.getYear() + '年' + t.getMonth() + '月' + t.getDay() + '日'
    }
  }
}
</script>

<style>
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
