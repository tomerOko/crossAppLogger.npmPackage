import { IPbHttpLogger } from "./pbHttpLogger.interface";
import { pbHttpLogObjectBuilder } from "./logObjectComposer/pbHttpLogObjectBuilder/pbHttpLogObjectBuilder.interface";
import { ISensativeValuesEncryptor } from "./sensativeKeisEncryptor/sensativeValuesEncryptor.interface";
import { IDeepCloner } from "./logObjectComposer/DeepCloner/pbDeepClonner.interface";
import { ILogGeneralProperties } from "./logObjectComposer/pbHttpLogObjectBuilder/pbHttpLogObjects.interfaces";


export class PbHttpLogger<request, response, err> implements IPbHttpLogger<request, response, err> {
    
    private logObjectBuilder : pbHttpLogObjectBuilder<request, response, err>;
    private sensativeValuesEncryptor : ISensativeValuesEncryptor;
    private deepClone: IDeepCloner;
    private logger: IPbOutputLogger;

    constructor(logObjectBuilder : pbHttpLogObjectBuilder<request, response, err>, sensativeValuesEncryptor : ISensativeValuesEncryptor, deepClone: IDeepCloner, logger: IPbOutputLogger){
        this.logObjectBuilder = logObjectBuilder;
        this.sensativeValuesEncryptor =  sensativeValuesEncryptor;
        this.deepClone = deepClone;
        this.logger = logger;
    }

    logRequest(req: request):void{
        
        const cloned = this.deepClone.clone({req})
        const builtLog = this.logObjectBuilder.buildLogObjectOfRequest(cloned.req)
        this.encryptAndLog(builtLog)
    }

    logResponse(req: request, res: response):void{
        const cloned = this.deepClone.clone({req, res})
        const builtLog = this.logObjectBuilder.buildLogObjectOfResponse(cloned.req ,cloned.res)
        this.encryptAndLog(builtLog)
    }

    logRequestError(req: request, err: err):void{
        const cloned = this.deepClone.clone({req, err})
        const builtLog = this.logObjectBuilder.buildLogObjectOfRequestError(cloned.req, cloned.err)
        this.encryptAndLog(builtLog)

    }

    logResponseError(req : request, res: response, err: err ):void{
        const cloned = this.deepClone.clone({req, res, err})
        const builtLog = this.logObjectBuilder.buildLogObjectOfResponseError(cloned.req, cloned.res, cloned.err)
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
