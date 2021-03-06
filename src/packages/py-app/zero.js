import { mapState} from 'pinia'
import uistore from '../store/uistore.js'
import dataStore from '../store/dataStore'
import {useWebsocket} from "../hooks/websocket"
import {getVue} from "../index"
import InitTemplate from "../utils/handlerTag"


var watchs={}
function getWatcher(wsSender,id){
    return function(newdata,olddata){
        wsSender({
            type:"rawdataUpdate",
            msg:{
                id,
                value:newdata
            }
        })
        console.log(id,newdata,olddata)
    }
}


export default {
    name:'py-zero',
    created() {        
        const useUistore = uistore()
        const useDataStore = dataStore()
        if(this.wsrui){
            const wsSender = useWebsocket(this.wsrui,{
                handleMessageEvent(data){
                    const {msg,type} = data
                    console.log('收到信息',data)
                    if(type=="init"){
                        // 初始化
                        const {uidata,rawdata} = msg
                        useUistore.uidatas = uidata
                        useDataStore.datas = rawdata
                        for (const key in rawdata) {
                            watchs[`datas.${key}`] = getWatcher(wsSender,key)
                        }
                    }
                    if(type=="rawdataUpdate"){
                        // 服务端数据更新
                        const {id,value} = msg
                        useDataStore.datas[id] = value
                    }
                }
            })
            this.$wsSender = wsSender
        }else{
             console.warn(`Please in "<py-app uri='your ws addr'>" websocket address specified in the tag!`)
        }
    },
    computed: {
        ...mapState(uistore,['uidatas','wsrui']),
        ...mapState(dataStore,['datas'])
      },
    render(h) {
        const Vue = getVue()
        const {template,eventFnc} = InitTemplate(this.$wsSender,this.uidatas)
        console.log(template,eventFnc)
        
        const opts = {
            template,
            computed: {
                ...mapState(uistore,['uidatas']),
                ...mapState(dataStore,['datas'])
              },
            watch:watchs,
            methods:eventFnc
        }
        return h(Vue.extend(opts))
    },
    // render(h) {
    //     // console.log("触发渲染更新",this.datas)
    //     const v =toCreateVnode(this,this.datas,h,this.uidatas)
    //     // console.log("vnode",v)
    //     return v
    // },
}
