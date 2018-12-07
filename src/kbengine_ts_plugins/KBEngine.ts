export namespace KBEngine 
{
    export const enum DEBUGLEVEL
	{
		DEBUG = 0,
		INFO,
		WARNING,
		ERROR,

		NOLOG,  // 放在最后面，使用这个时表示不输出任何日志（!!!慎用!!!）
    }
    
    export class Dbg
    {
        public static debugLevel:DEBUGLEVEL = DEBUGLEVEL.DEBUG;

        static getHead(): string
        {
            let now: Date = new Date();
            return "[" + now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() 
            + ":" + now.getMinutes() + ":" + now.getSeconds() + " " + now.getMilliseconds() + "] ";
        }

        static DEBUG_MSG(msg: string, ...params: any[]): void
        {
            if(DEBUGLEVEL.DEBUG >= this.debugLevel)
            {
                params.unshift(this.getHead(), msg);
                console.debug.apply(this, params);
            }
        }

        static INFO_MSG(msg: string, ...params: any[]): void
        {
            if(DEBUGLEVEL.INFO >= this.debugLevel)
            {
                params.unshift(this.getHead(), msg);
                console.info.apply(this, params);
            }
        }

        static WARNING_MSG(msg: string, ...params: any[]): void
        {
            if(DEBUGLEVEL.WARNING >= this.debugLevel)
            {
                params.unshift(this.getHead(), msg);
                console.warn.apply(this, params);
            }
        }
    
        static ERROR_MSG(msg: string, ...params: any[]): void
        {
            if(DEBUGLEVEL.ERROR >= this.debugLevel)
            {
                params.unshift(this.getHead(), msg);
                console.error.apply(this, params);
            }
        }
    
        static ASSERT(condition?: boolean, message?: string, ...data: any[]): void
        {
            // 使用抛出异常的方式来实现类似断言功能
            if(!condition)
            {
                throw(new Error(message));
            }

            // note：微信小游戏平台不支持，手册中提到的CC_WECHATGAME未定义，无法区分是否微信小游戏平台，
            // console.assert(condition, message, ...data);
            // 一些平台如小程序上可能没有assert
            // if(console.assert == undefined)
            // {
            //     console.assert = function(bRet, s)
            //     {
            //         if(!(bRet)) {
            //             ERROR_MSG(s);
            //         }
            //     }
            // }
        }
    }

    export const enum KBEventTypes 
    {
        // Create new account.
        // <para> param1(string): accountName</para>
        // <para> param2(string): password</para>
        // <para> param3(bytes): datas // Datas by user defined. Data will be recorded into the KBE account database, you can access the datas through the script layer. If you use third-party account system, datas will be submitted to the third-party system.</para>
        createAccount = "createAccount",

        // Login to server.
        // <para> param1(string): accountName</para>
        // <para> param2(string): password</para>
        // <para> param3(bytes): datas // Datas by user defined. Data will be recorded into the KBE account database, you can access the datas through the script layer. If you use third-party account system, datas will be submitted to the third-party system.</para>
        login = "login",

        // Logout to baseapp, called when exiting the client.	
        logout = "logout",

        // Relogin to baseapp.
        reloginBaseapp = "reloginBaseapp",

        // Request server binding account Email.
        // <para> param1(string): emailAddress</para>
        bindAccountEmail = "bindAccountEmail",

        // Request to set up a new password for the account. Note: account must be online.
        // <para> param1(string): old_password</para>
        // <para> param2(string): new_password</para>
        newPassword = "newPassword",

        // ------------------------------------连接相关------------------------------------

        // Kicked of the current server.
        // <para> param1(uint16): retcode. // server_errors</para>
        onKicked = "onKicked",

        // Disconnected from the server.
        onDisconnected = "onDisconnected",

        // Status of connection server.
        // <para> param1(bool): success or fail</para>
        onConnectionState = "onConnectionState",

        // ------------------------------------logon相关------------------------------------

        // Create account feedback results.
        // <para> param1(uint16): retcode. // server_errors</para>
        // <para> param2(bytes): datas. // If you use third-party account system, the system may fill some of the third-party additional datas. </para>
        onCreateAccountResult = "onCreateAccountResult",

        // Engine version mismatch.
        // <para> param1(string): clientVersion
        // <para> param2(string): serverVersion
        onVersionNotMatch = "onVersionNotMatch",

        // script version mismatch.
        // <para> param1(string): clientScriptVersion
        // <para> param2(string): serverScriptVersion
        onScriptVersionNotMatch = "onScriptVersionNotMatch",

        // Login failed.
        // <para> param1(uint16): retcode. // server_errors</para>
        onLoginFailed = "onLoginFailed",

        // Login to baseapp.
        onLoginBaseapp = "onLoginBaseapp",

        // Login baseapp failed.
        // <para> param1(uint16): retcode. // server_errors</para>
        onLoginBaseappFailed = "onLoginBaseappFailed",

        // Relogin to baseapp.
        onReloginBaseapp = "onReloginBaseapp",

        // Relogin baseapp success.
        onReloginBaseappSuccessfully = "onReloginBaseappSuccessfully",

        // Relogin baseapp failed.
        // <para> param1(uint16): retcode. // server_errors</para>
        onReloginBaseappFailed = "onReloginBaseappFailed",

        // ------------------------------------实体cell相关事件------------------------------------

        // Entity enter the client-world.
        // <para> param1: Entity</para>
        onEnterWorld = "onEnterWorld",

        // Entity leave the client-world.
        // <para> param1: Entity</para>
        onLeaveWorld = "onLeaveWorld",

        // Player enter the new space.
        // <para> param1: Entity</para>
        onEnterSpace = "onEnterSpace",

        // Player leave the space.
        // <para> param1: Entity</para>
        onLeaveSpace = "onLeaveSpace",

        // Sets the current position of the entity.
        // <para> param1: Entity</para>
        set_position = "set_position",

        // Sets the current direction of the entity.
        // <para> param1: Entity</para>
        set_direction = "set_direction",

        // The entity position is updated, you can smooth the moving entity to new location.
        // <para> param1: Entity</para>
        updatePosition = "updatePosition",

        // The current space is specified by the geometry mapping.
        // Popular said is to load the specified Map Resources.
        // <para> param1(string): resPath</para>
        addSpaceGeometryMapping = "addSpaceGeometryMapping",

        // Server spaceData set data.
        // <para> param1(int32): spaceID</para>
        // <para> param2(string): key</para>
        // <para> param3(string): value</para>
        onSetSpaceData = "onSetSpaceData",

        // Start downloading data.
        // <para> param1(int32): rspaceID</para>
        // <para> param2(string): key</para>
        onDelSpaceData = "onDelSpaceData",

        // Triggered when the entity is controlled or out of control.
        // <para> param1: Entity</para>
        // <para> param2(bool): isControlled</para>
        onControlled = "onControlled",

        // Lose controlled entity.
        // <para> param1: Entity</para>
        onLoseControlledEntity = "onLoseControlledEntity",

        // ------------------------------------数据下载相关------------------------------------

        // Start downloading data.
        // <para> param1(uint16): resouce id</para>
        // <para> param2(uint32): data size</para>
        // <para> param3(string): description</para>
        onStreamDataStarted = "onStreamDataStarted",

        // Receive data.
        // <para> param1(uint16): resouce id</para>
        // <para> param2(bytes): datas</para>
        onStreamDataRecv = "onStreamDataRecv",

        // The downloaded data is completed.
        // <para> param1(uint16): resouce id</para>
        onStreamDataCompleted = "onStreamDataCompleted",
    }

    class EventInfo
    {
        readonly classinst : any ;
        readonly callbackfn : Function ;

        constructor(classinst: any, callbackfn : Function) {
            this.classinst = classinst;
            this.callbackfn = callbackfn;
        }
    }

    class FiredEvent
    {
        readonly evtName: string;
        readonly evtInfo: EventInfo;
        readonly args: any;

        constructor(evtName: string, evtInfo: EventInfo, args: any) {
            this.evtName = evtName;
            this.evtInfo = evtInfo;
            this.args = args;
        }
    }

    export class KBEvent
    {
        private static  _events: any = {};
        private static  _isPause: boolean = false;
        private static _firedEvents: Array<FiredEvent> = [];

        static register(evtName: string, classinst: any, strCallback: string): void
        {
            let callbackfn = classinst[strCallback];

            if(callbackfn == undefined)
            {
                Dbg.ERROR_MSG('KBEngine.KBEvent::fire: not found strCallback(' + classinst  + ")!"+strCallback);
                return;
            }

            let evtlst = this._events[evtName];  
            if(evtlst == undefined)
            {
                evtlst = [];
                this._events[evtName] = evtlst;
            }

            let info = new EventInfo(classinst, callbackfn);
            evtlst.push(info);
        }

        static deregisterAll(classinst: any): void
        {
            for(var itemkey in this._events)
            {
                this.deregister(itemkey, classinst);
            }
        }

        static deregister(evtName: string, classinst: any): void
        {
            let evtlst: Array<EventInfo> = this._events[evtName];
            if(evtlst == undefined)
            {
                Dbg.ERROR_MSG("KBEvent::deregister:cant find event by name(%s).", evtName);
                return;
            }

            while(true)
            {
                var found = false;
                for(var i=0; i<evtlst.length; i++)
                {
                    var info = evtlst[i];
                    if(info.classinst == classinst)
                    {
                        evtlst.splice(i, 1);
                        found = true;
                        break;
                    }
                }
                
                if(!found)
                    break;
            }

            this.removeFiredEvent(evtName, classinst);
        }

        static fire(evtName: string, ...params: any[]): void
        {
            let evtlst: Array<EventInfo> = this._events[evtName];
            if(evtlst == undefined)
            {
                Dbg.ERROR_MSG("KBEvent::Fire:cant find event by name(%s).", evtName);
                return;
            }

            for(let info of evtlst)
            {
                try
                {
                    if(!this._isPause)
                    {
                        info.callbackfn.apply(info.classinst, params);
                    }
                    else
                    {
                        let firedEvent = new FiredEvent(evtName, info, params);
                        this._firedEvents.push(firedEvent);
                    }
                    
                }
                catch(e)
                {
                    Dbg.ERROR_MSG("KBEvent::Fire(%s):%s", evtName, e);
                }
            }
        }

        static pause(): void
        {
            this._isPause = true;
        }

        static resume(): void
        {
            this._isPause = false;

            let firedEvents: Array<FiredEvent> = this._firedEvents;
            Dbg.INFO_MSG("resume");
            while(firedEvents.length > 0)
            {
                var evt = firedEvents.shift();
                var info = evt.evtInfo;
                var args = evt.args;
                Dbg.INFO_MSG("resume evtname: " + evt.evtName);
                if(args.length < 1)
                {
                    info.callbackfn.apply(info.classinst);
                }
                else
                {
                    info.callbackfn.apply(info.classinst, args);
                }
            }
        }

        static removeAllFiredEvent(classinst: any): void
        {
            this.removeFiredEvent("", classinst);
        }

        static removeFiredEvent(evtName: string, classinst: any): void
        {
            let firedEvents:Array<FiredEvent> = this._firedEvents;
            while(true)
            {
                var found = false;
                for(var i=0; i<firedEvents.length; i++)
                {
                    var evt = firedEvents[i];
                    if((evtName == "" || evt.evtName == evtName) && evt.evtInfo.classinst == classinst)
                    {
                        firedEvents.splice(i, 1);
                        found = true;
                        break;
                    }
                }

                if(!found)
                    break;
            }
        }
    }

    

    class NetworkInterface
    {
        private socket: WebSocket = undefined;
        private onOpenCB: Function = undefined;

        public connectTo(addr: string, callbackFunc?: (event:Event)=>any): void
        {
            try
            {
                this.socket = new WebSocket(addr);
                Dbg.ERROR_MSG("NetworkInterface::connectTo:Init socket");
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
            Dbg.ERROR_MSG("NetworkInterface::onopen:success!");
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

    class PackFloatXType
    {
        private _unionData: ArrayBuffer;
        fv: Float32Array;
        uv: Uint32Array;
        iv: Int32Array;

        constructor()
        {
            this._unionData = new ArrayBuffer(4);
            this.fv = new Float32Array(this._unionData, 0, 1);
            this.uv = new Uint32Array(this._unionData, 0, 1);
            this.iv = new Int32Array(this._unionData, 0, 1);
        }
    }

    class INT64
    {
        low: number;
        high: number;
        sign: number = 1;

        constructor(p_low: number, p_high: number)
        {
            this.low = p_low;
            this.high = p_high;
            
            if(p_high >= 2147483648)
            {
                this.sign = -1;
                this.low = (4294967296 - this.low) & 0xffffffff;
                if(p_low > 0)
                {
                    this.high = 4294967295 - this.high;
                }
                else
                {
                    this.high = 4294967296 - this.high;
                }
            }
        }
    }

    class UINT64
    {
        low: number;
        high: number;

        constructor(p_low: number, p_high: number)
        {
            this.low = p_low >>> 0;
            this.high = p_high;
        }
    }

    class MemoryStream
    {
        rpos: number = 0;
        wpos: number = 0;
        private buffer: ArrayBuffer;

        constructor(size_or_buffer: number | ArrayBuffer)
        {
            if(size_or_buffer instanceof ArrayBuffer)
            {
                this.buffer = size_or_buffer;
            }
            else
            {
                this.buffer = new ArrayBuffer(size_or_buffer);
            }
        }

        space(): number
        {
            return this.buffer.byteLength - this.wpos;
        }

        readInt8(): number
        {
            let buf = new Int8Array(this.buffer, this.rpos);
            this.rpos += 1;
            return buf[0];
        }

        readUint8(): number
        {
            let buf = new Uint8Array(this.buffer, this.rpos);
            this.rpos += 1;
            return buf[0];
        }

        readUint16(): number
        {
            let buf = new Uint8Array(this.buffer, this.rpos);
            this.rpos += 2;
            return ((buf[1] & 0xff) << 8) + (buf[0] & 0xff);
        }

        readInt16(): number
        {
            let value = this.readUint16();
            if(value >= 32768)
                value -= 65536;
            return value;
        }

        readUint32(): number
        {
            let buf = new Uint8Array(this.buffer, this.rpos);
            this.rpos += 4;
    
            return (buf[3] << 24) + (buf[2] << 16) + (buf[1] << 8) + buf[0];
        }
    
        readInt32(): number
        {
            let value = this.readUint32();
            if(value >= 2147483648)
                value -= 4294967296;
            return value;
        }

        readUint64(): UINT64
        {
            return new UINT64(this.readUint32(), this.readUint32());
        }

        readInt64(): INT64
        {
            return new INT64(this.readUint32(), this.readUint32());
        }

    }

    export class KBEngineArgs
    {
        public address: string = "127.0.0.1";
        public port: number = 20013;
        public serverHeartbeatTick: number = 100;
        public clientType: number = 5;
        public isOnInitCallPropertysSetMethods: boolean = true;
        public isWss: boolean = false;
    }

    export class KBEngineApp
    {
        public static app: KBEngineApp = undefined;
        private networkInterface: NetworkInterface  = new NetworkInterface();

        private args: KBEngineArgs;
    
        private username: string = "test";
        private password: string = "123456";
        private clientdatas: Uint8Array = new Uint8Array(0);
        private encryptedKey: string = "";
    
        private loginappMessageImported: boolean = false;
        private baseappMessageImported: boolean = false;
        private serverErrorsDescrImported: boolean = false;
        private entitydefImported: boolean = false;

         // 登录loginapp的地址
        private serverAddress: string = "";
        private port: number = 0;
        
        // 服务端分配的baseapp地址
        public baseappAddress: string = "";
        public baseappPort: number = 0;

        private isWss: boolean = false;
        private protocol: string = "ws://";

        // 当前状态
        public currserver: string = "";
        public currstate: string = "";
        public currconnect: string = "";

        // 扩展数据
        public serverdatas: string = "";

        // 版本信息
        public serverVersion: string = "";
        public serverScriptVersion: string = "";
        public serverProtocolMD5: string = "";
        public serverEntityDefMD5: string = "";
        public clientVersion: string = "";
        public clientScriptVersion: string = "";

        // player的相关信息
        private entity_id: number = 0;
        //private entity_uuid: DataTypes.UINT64;
        private entity_type: string = "";

        // private controlledEntities: Array<Entity> = new Array<Entity>();
        // private entityIDAliasIDList: Array<number> = new Array<number>();

        // // 这个参数的选择必须与kbengine_defs.xml::cellapp/aliasEntityID的参数保持一致
        // useAliasEntityID = true;
        
        // isOnInitCallPropertysSetMethods = true;

        // // 当前玩家最后一次同步到服务端的位置与朝向与服务端最后一次同步过来的位置
        // entityServerPos = new KBEMath.Vector3(0.0, 0.0, 0.0);

        // 客户端所有的实体
		// KBEngine.app.entities = {};
		// KBEngine.app.entityIDAliasIDList = [];
		// KBEngine.app.controlledEntities = [];

        // spacedata: {[key:string]: string} = {};
        // spaceID = 0;
        // spaceResPath = "";
        // isLoadedGeometry = false;

        // lastTickTime
        // lastTickCBTime

        // 按照标准，每个客户端部分都应该包含这个属性
        public component: string = "";

        constructor(args: KBEngineArgs)
        {
            Dbg.ASSERT(KBEngineApp.app === undefined, "KBEngineApp::constructor:singleton KBEngineApp._app must be undefined.");
            KBEngineApp.app = this;
            this.initialize(args);
        }

        static getSingleton()
        {
            if(KBEngineApp.app == undefined)
			{
				throw new Error("Please create KBEngineApp!");
			}

			return KBEngineApp.app;
        }

        public initialize(args: KBEngineArgs): boolean
        {
            this.args = args;
            this.serverAddress = args.address;
            this.port = args.port;
            this.isWss = args.isWss;
            this.protocol = args.isWss ? "wss://" : "ws://";

            this.initNetwork();
            this.installEvents();
            return true;
        }

        initNetwork(): void
        {

        }

        installEvents(): void
        {
            KBEvent.register(KBEventTypes.login, KBEngineApp.app, "login");
        }

        resetSocket(): void
        {

        }

        reset(): void
        {
            // if(KBEngineApp.app.entities != undefined && KBEngineApp.app.entities != null)
            // {
            //     KBEngineApp.app.clearEntities(true);
            // }
		
            KBEngineApp.app.resetSocket();
            
            KBEngineApp.app.currserver = "loginapp";
            KBEngineApp.app.currstate = "create";
            KBEngineApp.app.currconnect = "loginapp";

            // 扩展数据
            KBEngineApp.app.serverdatas = "";
            
            // 版本信息
            KBEngineApp.app.serverVersion = "";
            KBEngineApp.app.serverScriptVersion = "";
            KBEngineApp.app.serverProtocolMD5 = "";
            KBEngineApp.app.serverEntityDefMD5 = "";
            KBEngineApp.app.clientVersion = "1.2.7";
            KBEngineApp.app.clientScriptVersion = "0.1.0";
            
            // // player的相关信息
            // KBEngineApp.app.entity_uuid = null;
            // KBEngineApp.app.entity_id = 0;
            // KBEngineApp.app.entity_type = "";

            // // 这个参数的选择必须与kbengine_defs.xml::cellapp/aliasEntityID的参数保持一致
            // KBEngineApp.app.useAliasEntityID = true;

            // // 当前玩家最后一次同步到服务端的位置与朝向与服务端最后一次同步过来的位置
            // KBEngineApp.app.entityServerPos = new KBEngine.Vector3(0.0, 0.0, 0.0);
            
            // // 客户端所有的实体
            // KBEngineApp.app.entities = {};
            // KBEngineApp.app.entityIDAliasIDList = [];
            // KBEngineApp.app.controlledEntities = [];

            // // 空间的信息
            // KBEngineApp.app.spacedata = {};
            // KBEngineApp.app.spaceID = 0;
            // KBEngineApp.app.spaceResPath = "";
            // KBEngineApp.app.isLoadedGeometry = false;
            
            // var dateObject = new Date();
            // KBEngineApp.app.lastTickTime = dateObject.getTime();
            // KBEngineApp.app.lastTickCBTime = dateObject.getTime();
            
            // KBEngine.mappingDataType();
            
            // 当前组件类别， 配套服务端体系
            KBEngineApp.app.component = "client";
        }

        getServerAddr(ip: string, port: number): string
        {
            var serverAddr = KBEngineApp.app.protocol + ip;
            if(port != 0)
            {
                serverAddr += ":" + port;
            }

            return serverAddr;
        }

        login(username: string, password: string, datas:any): void
        {
            KBEngineApp.app.reset();
            KBEngineApp.app.username = username;
            KBEngineApp.app.password = password;
            KBEngineApp.app.clientdatas = datas;

            KBEngineApp.app.login_loginapp(true);
        }

        private login_loginapp(noconnect: boolean): void
        {
            if(noconnect)
            {
                var serverAddr = this.getServerAddr(KBEngineApp.app.serverAddress, KBEngineApp.app.port);
                Dbg.INFO_MSG("KBEngineApp::login_loginapp: start connect to " + serverAddr + "!")
                KBEngineApp.app.currconnect = "loginapp";
                KBEngineApp.app.networkInterface.connectTo(serverAddr, (event: MessageEvent) => this.onOpenLoginapp_login(event));
            }
            else
            {

            }
        }

        private onOpenLoginapp_login(event: MessageEvent) 
        {
            Dbg.DEBUG_MSG("KBEngineApp::onOpenLoginapp_login:success to %s.", this.serverAddress);
            KBEvent.fire(KBEventTypes.onConnectionState, true);

            this.currserver = "loginapp";
            this.currstate = "login";

            if(!this.loginappMessageImported)
            {
                Dbg.INFO_MSG("KBEngineApp::onOpenLoginapp_login: start importClientMessages ...");
                KBEvent.fire("Loginapp_importClientMessages");
            }
            else
            {
                this.onImportClientMessagesCompleted();
            }
        }

        private onImportClientMessagesCompleted()
        {
            
        }
    }
}