namespace KBEngine 
{
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
            
            this.currserver = "loginapp";
            this.currstate = "login";
        }
    }
}