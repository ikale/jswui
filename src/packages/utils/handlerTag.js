

function getEvent(wsSender,eventName){
    return function(e){
        wsSender({
            type:'uiEvent',
            msg:{
                eventName,
            }
        })
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
        container['eventFnc'][eventName] = getEvent(container.wsSender,eventName)
    }
    return s
}


function createTemplate(container,opts,slotName=null){
    if(!opts) return ""
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




const InitTemplate = function(wsSender,uidatas){
    let container = {
        wsSender,
        eventFnc:{},
        template:""
    }
    let template = createTemplate(container,uidatas)
    container.template = template

    return container
}

export default InitTemplate