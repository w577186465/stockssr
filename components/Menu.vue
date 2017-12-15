<template>
  <section class="menu">
    <ul class="clearfix">
      <li v-for="v of menus">
        <a v-bind:href="v.url">{{v.name}}</a>
      </li>
    </ul>
  </section>
</template>

<script>
// import axios from 'axios'

export default {
  data () {
    return {
      menus: [
        {name: '研报', url: '/report'},
        {name: '快讯', url: '/news'}
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
  $height: 50px;

  .menu {
    height: $height;
    background-color: #4a70d6;
    background-color: #445279;

    ul {
      padding: 0 30px;
      li {
        float: left;

        a {
          padding: 0 25px;
          display: block;
          color: #fff;
          line-height: $height;
          font-size: 14px;
        }

        a:hover {
          background-color: #3c5cb3;
          background-color: #3a4565;
        }
      }
    }

  }

</style>
