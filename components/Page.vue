<template>
  <section class="paginate clearfix" :class="styleType">
    <nuxt-link :to="{name: rname, query: { page: 1 }}">首页</nuxt-link>
    <nuxt-link v-for="i of pagenum" :to="{name: name, query: { page: i }}">{{i}}</nuxt-link>
    <nuxt-link :to="{name: rname, query: { page: num }}">尾页</nuxt-link>
  </section>
</template>

<script>
export default {
  props: {
    rname: String,
    num: Number,
    current: {
      type: Number,
      default: 1
    },
    showItem: {
      type: Number,
      default: 8
    },
    link: String,
    styleType: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    pagenum: function () {
      var pag = []
      if (this.current < this.showItem) {
        var i = Math.min(this.showItem, this.num)
        while (i) {
          pag.unshift(i--)
        }
      } else {
        var middle = this.current - Math.floor(this.showItem / 2) // 从哪里开始
        i = this.showItem
        if (middle > (this.num - this.showItem)) {
          middle = (this.num - this.showItem) + 1
        }
        while (i--) {
          pag.push(middle++)
        }
      }
      return pag
    }
  }
}
</script>

<style lang="scss" scoped>
  .paginate.default {
      float: right;
      margin: 30px 15px 15px 15px;
      line-height: 28px;

      a {
        padding: 0 10px;
        cursor: pointer;
        display: inline-block;
      }

      .currect {
        border: 1px solid #ddd;
      }
    }
</style>
