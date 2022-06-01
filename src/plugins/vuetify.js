import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import * as components  from 'vuetify/lib/components'
// 注册所有的组件

Vue.use(Vuetify,{
    components:{...components}  
});

export default new Vuetify({
});
