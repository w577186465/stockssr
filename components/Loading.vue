<template>
  <div class="loading windmill" v-if="show">
    <div class="bg"></div>
    <div class="animate"></div>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .windmill.loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .bg {
      background: #fff;
      opacity: 0.5;
      width: 100%;
      height: 100%;
    }

    .animate {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 60px;
      height: 60px;
      margin-top: -30px;
      margin-left: -30px;
    }
  }
</style>
