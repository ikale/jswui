/**
 *  messge
 *  -- sid
 *  -- type
 *  -- msg
 */ 

function useWebsocket(uri,{handleOpenEvent,handleCloseEvent,handleErrorEvent,handleMessageEvent}={}){
    const ws = new WebSocket(uri)
    var sid = 0
    const send = ({type,msg})=>{
        sid++
        ws.send(JSON.stringify({
            sid,
            type,
            msg
        }))
    }

    const init=()=>{
        bindEvent()
    }
    function bindEvent(){
        ws.addEventListener("open",handleOpen,false)
        ws.addEventListener("close",handleClose,false)
        ws.addEventListener("error",handleError,false)
        ws.addEventListener("message",handleMessage,false)
    }

    function handleOpen(e){
        // 这里可以添加一些默认逻辑
        send({type:'init'})
        if(handleOpenEvent) handleOpenEvent(e)
        else console.log("websocket opened.",e)
    }

    function handleClose(e){
        // 这里可以添加一些默认逻辑
        if(handleCloseEvent) handleCloseEvent(e)
        else console.log("websocket closed.",e)
    }
    
    function handleError(e){
        // 这里可以添加一些默认逻辑   
        if(handleErrorEvent) handleErrorEvent(e)
        else console.warn("websocket error.",e)
    }
    
    function handleMessage(e){
        // 这里可以添加一些默认逻辑
        let data = {}
        try {
            data = JSON.parse(e.data)
        } catch (error) {
            data['msg'] = e.data
        }
        if(handleMessageEvent) handleMessageEvent(data)
        else console.log("websocket message.",e)
    }

    init()
    return send
}

export {
    useWebsocket
}