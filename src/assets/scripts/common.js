exports.install = function (Vue, options) {
    Vue.prototype.baseUrl = function (link){
        return process.env.baseUrl + link
    }
}
