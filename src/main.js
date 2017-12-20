import Vue from 'vue'
import App from './App.vue'

Vue.prototype.linkto = function () {
  
}

Vue.prototype.linkto = function (path) {
  return process.env.apiPath + path
}

new Vue({
  el: '#app',
  render: h => h(App)
})
