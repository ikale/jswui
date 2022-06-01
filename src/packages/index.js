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


export const init= function(Vue){
  install(Vue)
  Vue.use(PiniaVuePlugin)  
  const pinia = createPinia()
  return {pinia}
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