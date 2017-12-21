var Toast = {}
Toast.install = function (Vue, options) {
  Vue.prototype.$apiPath = function () {
    return process.env.API_URL
  }
}
module.exports = Toast
