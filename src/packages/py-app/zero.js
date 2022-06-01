function toCoverData(d,v){
    /**
     * 数据绑定
     * 使用 __$name$ 的格式字符串 将自动映射到 dataStore上面
     * 不符合规则的数据，将原样返回
     */ 
    if(typeof v==="string"&&v.split(" ").length==1&&v.startsWith("__$")&&v.endsWith("$")){
        return d[v]
    }
    return v
}


function toCreateVnode(c,d,h,opts,slotname=null){
    let {tag,props,events,solts} = opts
    tag = typeof tag === "string"?tag.trim():null
    tag = !tag&&slotname?'template':tag
    

    if(slotname){
        // 有指定插槽
        if(!opts){
            return h(tag,{slot:slotname},[])
        }else if(opts.constructor !== Object){
            return h(tag,{slot:slotname},toCoverData(d,opts))
        }
    }

    if(tag){
        // console.log("id:",id)
        props = (props && props.constructor === Object)?props:{}
        let p = {}
        for (const key in props) {
            // 处理props
            p[key] =toCoverData(d,props[key])
            if(key==="value") console.log("value",p[key])
        }

        solts = (solts && solts.constructor === Object)?solts:null        
        events = (events && events.constructor === Object)?events:null
        
        if(events){
            // 事件处理
            let e ={}
            for (const key in events) {
                if(key=="input"){
                    e[key] = function(value){
                        console.log("input",value)
                        c.$emit('input', value)
                    }
                }
                else{
                    e[key] = (e)=>console.log(e)
                }
                
            }
            p['on'] = e
        }

        if(slotname) p['slot'] = slotname  // 添加slot名称
        if(solts){
            // 插槽处理
            let child = []
            for (const key in solts) {
                if(!Array.isArray(solts[key])) continue
                for (let i = 0; i < solts[key].length; i++) {
                    const _opts = solts[key][i];
                    if(key=="default"){
                        child.push(toCreateVnode(c,d,h,_opts))
                    }else{
                        child.push(toCreateVnode(c,d,h,_opts,key))
                    }
                }
            }
            // console.log("子元素",child)
            return h(tag,p,child)
        }else{
            return h(tag,p)
        }
    }else{
        
        return toCoverData(d,opts)
    }
}

// const opts = {
//     id:'0',
//     tag:"div",
//     props:{name:"ikale", age:18},
//     events:{"click":"onclick"},
//     solts:{
//         default:[
//             "输入点能量吧",
//             {
//                 id:'1',
//                 tag:"v-text-field",
//                 props:{name:"chao", age:25},
//                 events:{"input":"input"},
//                 solts:{
//                     append:['我不知道'],
//                     prepend:["爱是什么"]
//                 }
//             }
//         ]
//     }
// }


import { mapState} from 'pinia'
import uistore from '../store/uistore.js'
import dataStore from '../store/dataStore'
import {useWebsocket} from "../hooks/websocket"

export default {
    name:'py-zero',
    created() {
        const useUistore = uistore()
        const useDataStore = dataStore()
        let xx = 0
        setInterval(()=>{
            xx++
            useDataStore.datas.__$1$=`ikale-${xx}`
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
        // console.log("触发渲染更新",this.datas)
        const v =toCreateVnode(this,this.datas,h,this.uidatas)
        // console.log("vnode",v)
        return v
    },
}
