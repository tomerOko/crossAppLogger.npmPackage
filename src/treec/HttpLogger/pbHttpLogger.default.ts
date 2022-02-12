import { IPbHttpLogger } from "./pbHttpLogger.interface";
import { ISensativeValuesEncryptor } from "./sensativeKeisEncryptor/sensativeValuesEncryptor.interface";
import { IDeepCloner } from "./logObjectComposer/DeepCloner/pbDeepClonner.interface";
import { ILogGeneralProperties } from "./pbHttpLogObjects.interfaces";
import { LogObjectComposer } from "./logObjectComposer/logObjectComposer.dufault";
import { ILogObjectComposer } from "./logObjectComposer/logObjectComposer.interface";


export class PbHttpLogger<request, response, err> implements IPbHttpLogger<request, response, err> {
    
    private logObjectComposer : ILogObjectComposer<request, response, err, IHaveStartTime>;
    private sensativeValuesEncryptor : ISensativeValuesEncryptor;
    private logger: IPbOutputLogger;

    constructor(logObjectComposer :  ILogObjectComposer<request, response, err , IHaveStartTime>, sensativeValuesEncryptor : ISensativeValuesEncryptor, deepClone: IDeepCloner, logger: IPbOutputLogger){
        this.logObjectComposer = logObjectComposer;
        this.sensativeValuesEncryptor =  sensativeValuesEncryptor;
        this.logger = logger;
    }

    logRequest(req: request):void{
        this.logObjectComposer.addPropertiesToOriginalRequest(req)
        const builtLog = this.logObjectComposer.composeRequestLogObject(req)
        this.encryptAndLog(builtLog)
    }

    logResponse(req: request, res: response):void{
        const builtLog = this.logObjectComposer.composeResponseLogObject(req as request & IHaveStartTime ,res)
        this.encryptAndLog(builtLog)
    }

    logRequestError(req: request, err: err):void{
        const builtLog = this.logObjectComposer.composeRequestErrorLogObject(req, err)
        this.encryptAndLog(builtLog)

    }

    logResponseError(req : request, res: response, err: err ):void{
        const builtLog = this.logObjectComposer.composeResponseErrorLogObject(req as request & IHaveStartTime, res, err)
        this.encryptAndLog(builtLog)
    }

    private encryptAndLog(builtLog:ILogGeneralProperties<any>){
        const encryptedLogObject = this.sensativeValuesEncryptor.encrypt(builtLog)
        this.logger.log(encryptedLogObject)
    }
}


export interface IPbOutputLogger{
    log:(object:any) => void
}

class IPbOutputLoggerMock{
    log(obj:any){console.log(obj)}
}
