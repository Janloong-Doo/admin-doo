// var messageHandler = (data: any) => {
// };
const initWebSocket = (url: string, callBack: any) => {
    if ("WebSocket" in window) {
        // messageHandler = callBack
        console.log("您的浏览器支持WebSocket并初始化");
        const ws = new WebSocket("ws://localhost:8902/hap/ws/msg/doo");
        ws.onopen = wsonopen;
        ws.onclose = wsonclose;
        ws.onmessage = (e)=>{
            wsonmessage(e,callBack)
        }
        ws.onerror = wsonerror;
        return ws;
    } else {
        console.log("您的浏览器不支持WebSocket");
    }
}
const wsonopen = (e: any) => {
    console.log("onopen:", e);
}
const wsonclose = (e: any) => {
    console.log("onclose:", e);
}
const wsonmessage = (e: any,callBack:any) => {
    console.log("onmessage:", e);
    callBack(e.data)
}
const wsonerror = (e: any) => {
    console.log("onerror:", e);
}

export {initWebSocket};