

function getEvent(eventName){
    return function(e){
        console.log("触发事件",eventName,e)
    }
}


function toCoverData(v){
    /**
     * 数据绑定
     * 使用 __$name$ 的格式字符串 将自动映射到 dataStore上面
     * 不符合规则的数据，将原样返回
     */ 
    let value =v
    let isbind = false
    if(typeof v==="string"&&v.split(" ").length==1&&v.startsWith("__$")&&v.endsWith("$")){
        value= `datas.${v}`
        isbind = true
    }
    return {
        value,
        isbind
    }
}


function createProps(props){
    if(!props) return ""
    let s = ""
    for (const key in props) {        
        let {value,isbind} = toCoverData(props[key])
        let _key=""
        if(key.startsWith("v-")){
            _key = isbind?`${key}`:key
        }else{
            _key = isbind?`:${key}`:key
        }
        if (typeof value ==="string")value = `'${value}'`
        s+=`${_key}=${value} `
    }
    return s
}


function createEvent(container,events){
    if(!events) return ""
    let s = ""
    for (const key in events) {
        const eventName = events[key];
        s+=`@${key}='${eventName}' `
        container['eventFnc'][eventName] = getEvent(eventName)
    }
    return s
}


function createTemplate(container,opts,slotName=null){
    let {tag,props,solts,events,slotValue} = opts

    let _slotMark =""
    if(slotName){
        if(slotValue){
            _slotMark=`v-slot:${slotName}='${slotValue}'`
        }else{
            _slotMark=`v-slot:${slotName}`
        }
    }
    
    let child=""
    if(solts){
        if(typeof solts==="string"){
            let {value,isbind} = toCoverData(solts)
            if(isbind) value=`{{${value}}}`
            child= value
        }
        else if(Array.isArray(solts)){
            for (let i = 0; i < solts.length; i++) {
                child+=createTemplate(container,solts[i])
            }
        }
        if(solts.constructor === Object){
            for (const slotName in solts) {
                let arr = solts[slotName]
                if(Array.isArray(arr)){
                    for (let i = 0; i < arr.length; i++) {                        
                        child+=createTemplate(container,arr[i],slotName)
                    }
                }
            }
        }
    }

    if(tag){
        return `<${tag} ${createProps(props)} ${createEvent(container,events)} ${_slotMark}>${child}</${tag}>`
    }else{
        if(typeof opts==="string"){            
            let {value,isbind} = toCoverData(opts)
            if(isbind) return `{{${value}}}`
            return `${opts}`
        }
        return `${opts}`
    }
}




const InitTemplate = function(uidatas){
    let container = {
        eventFnc:{},
        template:""
    }
    let template = createTemplate(container,uidatas)
    container.template = template

    return container
}

export default InitTemplate

// opts = {
//     tag:"div",
//     props:{name:"__$ikale$", ":age":18},
//     events:{"click":"onclick"},
//     slotValue:'',
//     
//     solts:{
//         default:[
//              "这是一段文本",
//             {
//                 tag:"div",
//                 props:{name:"chao", ":age":25},
//                 events:{"click":"onclick"},
//                 slotValue:'',
//             }
//         ],
//          append:[
//              {
//                  tag:"div",
//                  props:{name:"chao", ":age":25},
//                  events:{"click":"onclick"},
//                  slotValue:'{name,attr}'
//              },
//          ]
//     }
// }





// 备份vnode 创建
// function toCoverData(d,v){
//     /**
//      * 数据绑定
//      * 使用 __$name$ 的格式字符串 将自动映射到 dataStore上面
//      * 不符合规则的数据，将原样返回
//      */ 
//     if(typeof v==="string"&&v.split(" ").length==1&&v.startsWith("__$")&&v.endsWith("$")){
//         return d[v]
//     }
//     return v
// }


// function toCreateVnode(c,d,h,opts,slotname=null){
//     let {tag,props,events,solts} = opts
//     tag = typeof tag === "string"?tag.trim():null
//     tag = !tag&&slotname?'template':tag
    

//     if(slotname){
//         // 有指定插槽
//         if(!opts){
//             return h(tag,{slot:slotname},[])
//         }else if(opts.constructor !== Object){
//             return h(tag,{slot:slotname},toCoverData(d,opts))
//         }
//     }

//     if(tag){
//         // console.log("id:",id)
//         props = (props && props.constructor === Object)?props:null
//         const p = {}
//         events = (events && events.constructor === Object)?events:null
//         if(events){
//             // 事件处理
//             let e ={}
//             for (const key in events) {
//                 e[key] = (e)=>console.log("input",e)
//             }
//             p['on'] = e
//         }

//         if(props){
//             let _props = {}
//             for (const key in props) {            // 处理props                
//                 let v = toCoverData(d,props[key])            
//                 if(key==="v-model"){
//                     _props['value'] = v
//                     p['on'] = p['on'] || {}
//                     let _input =p['on']['input']
//                     p['on']['input'] = function(value){
//                         if(typeof _input==="function") _input(value)
//                         console.log("v-model")
//                         c.datas[v] = value
//                         // c.$emit('input',value)
//                     }
//                     continue
//                 }
//                 _props[key] =v
//             }
//             p['props'] = _props
//         }

//         solts = (solts && solts.constructor === Object)?solts:null        
        
        

//         if(slotname) p['slot'] = slotname  // 添加slot名称
//         if(solts){
//             // 插槽处理
//             let child = []
//             for (const key in solts) {
//                 if(!Array.isArray(solts[key])) continue
//                 for (let i = 0; i < solts[key].length; i++) {
//                     const _opts = solts[key][i];
//                     if(key=="default"){
//                         child.push(toCreateVnode(c,d,h,_opts))
//                     }else{
//                         child.push(toCreateVnode(c,d,h,_opts,key))
//                     }
//                 }
//             }
//             // console.log("子元素",child)
//             return h(tag,p,child)
//         }else{
//             return h(tag,p)
//         }
//     }else{
        
//         return toCoverData(d,opts)
//     }
// }

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

