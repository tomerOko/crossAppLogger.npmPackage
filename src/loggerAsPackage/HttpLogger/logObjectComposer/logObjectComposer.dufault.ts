import { IDeepCloner } from "./DeepCloner/pbDeepClonner.interface";
import { IPbRequestErrorLogObject, IPbRequestLogObject, IPbResponseErrorLogObject, IPbResponseLogObject } from "../httpLogObjects.interfaces";
import { ILogObjectComposer } from "./logObjectComposer.interface";


export class LogObjectComposer<request, response, err> implements ILogObjectComposer<request, response, err> {
    
    private deepClone: IDeepCloner;
    private logObjectBuilder : HttpLogObjectBuilder<request, response, err, IHaveStartTime>;

    constructor(logObjectBuilder : pbHttpLogObjectBuilder<request, response, err, IHaveStartTime>, deepClone: IDeepCloner){
        this.deepClone = deepClone;
        this.logObjectBuilder = logObjectBuilder;
    }

    composeRequestLogObject(req: request):IPbRequestLogObject{
        const cloned = this.deepClone.clone({req})
        const builtLog = this.logObjectBuilder.buildLogObjectOfRequest(cloned.req)
        return builtLog
    }

    composeResponseLogObject(req: request, res: response) : IPbResponseLogObject{
        const cloned = this.deepClone.clone({req, res})
        const builtLog = this.logObjectBuilder.buildLogObjectOfResponse(cloned.req as request & IHaveStartTime ,cloned.res)
        return builtLog
    }

    composeRequestErrorLogObject(req: request, err: err):IPbRequestErrorLogObject{
        const cloned = this.deepClone.clone({req, err})
        const builtLog = this.logObjectBuilder.buildLogObjectOfRequestError(cloned.req, cloned.err)
        return builtLog
    }

    composeResponseErrorLogObject(req: request, res: response, err: err):IPbResponseErrorLogObject{
        const cloned = this.deepClone.clone({req, res, err})
        const builtLog = this.logObjectBuilder.buildLogObjectOfResponseError(cloned.req as request & IHaveStartTime, cloned.res, cloned.err)
        return builtLog
    }
}


