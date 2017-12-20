import Vue from 'vue'

Vue.prototype.apiPath = function (path) {
  return process.env.apiPath + path
}
