<template>
  <div class="content">
    <h1>{{title}}</h1>
  </div>
</template>

<script>
  import axios from 'axios'

  var vm
  export default {
    props: {
      id: Number
    },
    data () {
      return {
        title: null
      }
    },
    created: function () {
      vm = this
      this.get()
    },
    watch: {
      id: function () {
        this.get()
      }
    },
    methods: {
      get: function () {
        axios.get(`http://share.localhost/api/report/industry/` + this.id)
          .then(function (res) {
            console.log(res)
            vm.title = res.data.data.title
          })
      }
    }
  }
</script>