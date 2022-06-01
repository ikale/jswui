import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import * as pywui from './packages/index'


Vue.config.productionTip = false

const {pinia} = pywui.init(Vue)

 new Vue({
  vuetify,
  pinia,
  render: h => h(App)
}).$mount('#app')
