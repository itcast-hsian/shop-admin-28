import Vue from 'vue'
import App from './App.vue'
// 导入axios
import axios from "axios";

// ElementUI: 1.引入element-ui
import ElementUI from  "element-ui";
// ElementUI: 2.element-ui样式导入
import 'element-ui/lib/theme-chalk/index.css';

// ElementUI: 3.全局注册插件
Vue.use(ElementUI);

// 当前是开发环境,可以忽略
Vue.config.productionTip = false;

// 挂载vue构造函数的原型链，每个组件可以通过this.$axios来调用
Vue.prototype.$axios = axios

// 根实例
// $mount('#app')相当于指定el的配置
// render 是es6箭头函数的缩写
new Vue({
  render: h => h(App),
}).$mount('#app')








// --------------------------------------------
// 之前的根实例
// new Vue({
//   el: "#app",

//   render: function(createElement){
//     return createElement(App)
//   },

//   // 箭头函数只有一行代码并且需要返回的时候
//   render: h = h(App)
// })