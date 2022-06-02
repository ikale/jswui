import PyApp from "./py-app/index.vue"
import { createPinia,PiniaVuePlugin } from 'pinia'


const coms = [PyApp]

const install = function(Vue){
    coms.forEach((com) => {       
        Vue.component(com.name, com);
      });
}

// if (typeof window !== 'undefined' && window.Vue) {
//   // 在浏览器环境下自动执行
//   install(window.Vue);  
// }

var _Vue = null


export const init= function(Vue){
  _Vue = Vue
  install(Vue)
  Vue.use(PiniaVuePlugin)  
  const pinia = createPinia()
  return {pinia}
}

export const getVue = function(){
  return _Vue
}


export const version = '0.0.1'



import uistore from './store/uistore.js'
import dataStore from './store/dataStore'


export const updateUi = function(uidata){
    const useUistore = uistore()
    useUistore.uidatas = uidata
}

export const updateData = function(rawdata){
  const useDataStore = dataStore()
  useDataStore.datas = rawdata
}

export const getUidata = function(){
  const useUistore = uistore()
  return useUistore.uidatas
}

export const getRawdata = function(){
  const useDataStore = dataStore()
  return useDataStore.datas
}


import createTemplate from "./utils/handlerTag.js"


let opts = {
    tag:"div",
    props:{name:"__$ikale$", ":age":18},
    events:{"click":"onclick"},
    slotValue:'',
    
    solts:{
        default:[
             "这是一段文本",
            {
                tag:"div",
                props:{name:"chao", ":age":25},
                events:{"click":"onclick"},
                slotValue:'',
            }
        ],
         append:[
             {
                 tag:"div",
                 props:{name:"chao", ":age":25},
                 events:{"click":"onclick"},
                 slotValue:'{name,attr}'
             },
         ]
    }
}
  
  console.log(createTemplate(opts))
  