import { mapState} from 'pinia'
import uistore from '../store/uistore.js'
import dataStore from '../store/dataStore'
import {useWebsocket} from "../hooks/websocket"
import {getVue} from "../index"
import createTemplate from "../utils/handlerTag"

export default {
    name:'py-zero',
    data() {
        return {
            templates:"<span>2323232</span>"
        }
    },
    created() {
        const useUistore = uistore()
        const useDataStore = dataStore()
        let xx = 0
        setInterval(()=>{
            xx++
            useDataStore.datas.__$1$=`ikale-${xx}`
            this.datas.__$0$++
        },1000)

        if(this.wsrui){
            this.$wsSender = useWebsocket(this.wsrui,{
                handleMessageEvent(data){
                    const {msg,type} = data
                    console.log('收到信息',data)
                    if(type=="init"){
                        const {uidata,rawdata} = msg
                        useUistore.uidatas = uidata
                        useDataStore.datas = rawdata
                    }
                }
            })
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
        const template = createTemplate(this.uidatas)
        console.log(template)
        const v = Vue.extend({
            template,
            computed: {
                ...mapState(uistore,['uidatas','wsrui']),
                ...mapState(dataStore,['datas'])
              },
        })
        return h(v)
    },
    // render(h) {
    //     // console.log("触发渲染更新",this.datas)
    //     const v =toCreateVnode(this,this.datas,h,this.uidatas)
    //     // console.log("vnode",v)
    //     return v
    // },
}
