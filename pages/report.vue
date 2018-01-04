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
        <nuxt-child/>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      onfold: false
    }
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
    }
  }
}
</script>

<style lang="scss">
  .container {
    
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
