import {defineStore} from "pinia"

export default defineStore('uiStore',{
    state:()=>({
        wsrui:'',
        uidatas:{id:"notInit",tag:'div',props:{'class':'abc'},solts:{default:['没有数据']}},
    }),

})