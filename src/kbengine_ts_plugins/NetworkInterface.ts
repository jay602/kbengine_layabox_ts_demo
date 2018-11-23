
namespace KBEngine 
{
    export class NetworkInterface
    {
        private socket: WebSocket = undefined;
        private onOpenCB: Function = undefined;

        public connectTo(addr: string, callbackFunc?: (event:Event)=>any): void
        {
            try
            {
                this.socket = new WebSocket(addr);
            }
            catch(e)
            {
                Dbg.ERROR_MSG("NetworkInterface::connectTo:Init socket error:" + e);
                KBEvent.fire("onConnectionState", false);
                return;
            }

            this.socket.binaryType = "arraybuffer";

            this.socket.onerror = this.onerror;
            this.socket.onclose = this.onclose;
            this.socket.onmessage = this.onmessage;
            this.socket.onopen = this.onopen;
            if(callbackFunc)
            {
                this.onOpenCB = callbackFunc;
            }
        }

        close()
        {
           
        }

        send(buffer: ArrayBuffer)
        {
            
        }

        private onopen = (event: MessageEvent) =>
        {
            Dbg.DEBUG_MSG("NetworkInterface::onopen:success!");
            if(this.onOpenCB)
            {
                this.onOpenCB(event);
                this.onOpenCB = undefined;
            }
        }
    
        private onerror = (event: MessageEvent) =>
        {
            // KBEDebug.DEBUG_MSG("NetworkInterface::onerror:...!");
            // KBEEvent.Fire("onNetworkError", event);
        }

        private onmessage = (event: MessageEvent) =>
        {
            
        }

        private onclose = () =>
        {
            // KBEDebug.DEBUG_MSG("NetworkInterface::onclose:...!");
            // KBEEvent.Fire("onDisconnected");
        }
    }
}