/*
## template options
{
    tag:name,
    props:{},
    events:{},
    solts:{
        default:[opts..],
    }   xxx:[opts..]
}
*/ 

function objcetToStr(obj){
    if(!obj) return ""
    let s = ""
    for (const key in obj) {
        const value = obj[key];
        s+=`${key}=${value} `
    }
    return s
}

function createSolt(solts){
    if(!solts) return ""
    let s = ""
    for (const solt in solts) {
        let array = solts[solt];
        let c = ""
        for (let i = 0; i < array.length; i++) {
            let template = array[i];
            let {tag} = template
            if(tag){
                c+=createTemplate(template)
            }else{
                c+=template+"\n"
            }
        }
        if(c.trim()!=""){
            s+=`<template v-slot:${solt}>${c}</template>`
        }
    }
    return s
}

function createTemplate(opts){
    let {tag,props,solts,events} = opts
    if(tag){
        let s = `<${tag} ${objcetToStr(props)} ${objcetToStr(events)}>${createSolt(solts)}</${tag}>`
        return s
    }
    return ''
}


// opts = {
//     tag:"div",
//     props:{name:"ikale", ":age":18},
//     events:{"@click":"onclick"},
//     solts:{
//         default:[
//             {
//                 tag:"div",
//                 props:{name:"chao", ":age":25},
//                 events:{"@click":"onclick"},
//             }
//         ]
//     }
// }

// console.log(createTemplate(opts))




