class customWs {
    private ws: WebSocket | null;

    constructor(url: string, msgHander: (data: any) => any) {
        // this.ws = new WebSocket();
        this.ws = this.createWebSocket(url, msgHander);
    }

    createWebSocket(url: string, msgHander: (data: any) => any): WebSocket | null {
        if ("WebSocket" in window) {
            // messageHandler = callBack
            console.log("您的浏览器支持WebSocket并初始化");
            // const ws = new WebSocket("ws://localhost:8902/hap/ws/msg/doo");
            const ws = new WebSocket(url);
            ws.onopen = (e) => {
                this.onOpenEvent(e)
            };

            ws.onclose = (e) => {
                this.onCloseEvent(e);
            };

            ws.onmessage = (e) => {
                this.onMessageEvent(e, msgHander)
            }
            ws.onerror = (e) => {
                this.onErrorEvent(e)
            };
            return ws;
        } else {
            console.log("您的浏览器不支持WebSocket");
            return null;
        }
    }

    onOpenEvent(e: any) {
        console.log("onopen:", e);
    }

    onCloseEvent(e: any) {
        console.log("onclose:", e);
    }

    onMessageEvent(e: any, msgHander: (data: any) => any) {
        console.log("onmessage:", e);
        try {
            let parse = JSON.parse(e.data);
            msgHander(parse)
        } catch (error) {
            console.log("非json:", error)
            msgHander({"data": e.data})
        }
    }

    onErrorEvent(e: any) {
        console.log("onerror:", e);
    }

    sendMsg(data: any) {
        this.ws?.send(data);
    }

}

export const initWebSocket = (url: string, msgHandler: (data: any) => any) => {
    return new customWs(url, msgHandler);
}
