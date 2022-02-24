import { ISensativeValuesEncryptor } from "./sensativeKeisEncryptor/sensativeValuesEncryptor.interface";
import { IDeepCloner } from "./logObjectComposer/DeepCloner/pbDeepClonner.interface";
import { ILogObjectComposer } from "./logObjectComposer/logObjectComposer.interface";
import { IOutputFormater } from "./outputFormater/outputFormater.interface";
import { IHttpLogger } from "./httpLogger.interface";


export class PbHttpLogger<request, response, err> implements IHttpLogger<request, response, err> {
    
    private sensativeValuesEncryptor : ISensativeValuesEncryptor;
    private outputFormater: IOutputFormater<any>;//todo why any
    private deepCloner: IDeepCloner;

    constructor(
        sensativeValuesEncryptor : ISensativeValuesEncryptor,
        deepCloner: IDeepCloner, 
        outputFormater: IOutputFormater<any>//todo why any
    ){
        this.sensativeValuesEncryptor =  sensativeValuesEncryptor;
        this.outputFormater = outputFormater;
        this.deepCloner=deepCloner
    }

    logRequest(req: request):void{
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
        this.outputFormater.log(encryptedLogObject)
    }
}


