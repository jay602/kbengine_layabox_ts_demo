class Test
{
    a: string;
    b: string;

    constructor(a: string, b: string)
    {
        this.a = a;
        this.b = b;
    }

    say(msg: string) {
        console.log(msg);
    }
}


let args = new KBEngine.KBEngineArgs();
args.address = "localhost";
args.port = 20013;
let app = new KBEngine.KBEngineApp(args);
KBEngine.KBEvent.fire("login", "loginName", "123456", "");

