import { pbHttpLogObjectBuilder } from "../logObjectComposer/pbHttpLogObjectBuilder/pbHttpLogObjectBuilder.interface";
import { IDeepCloner } from "../logObjectComposer/DeepCloner/pbDeepClonner.interface";
import { IPbRequestErrorLogObject, IPbRequestLogObject, IPbResponseErrorLogObject, IPbResponseLogObject } from "../pbHttpLogObjects.interfaces";
import { ILogObjectComposer } from "./logObjectComposer.interface";


export class LogObjectComposer<request, response, err> implements ILogObjectComposer<request, response, err, IHaveStartTime> {
    
    private deepClone: IDeepCloner;
    private logObjectBuilder : pbHttpLogObjectBuilder<request, response, err>;

    constructor(logObjectBuilder : pbHttpLogObjectBuilder<request, response, err>, deepClone: IDeepCloner){
        this.deepClone = deepClone;
        this.logObjectBuilder = logObjectBuilder;
    }

    composeRequestLogObject(req: request):IPbRequestLogObject{
        const cloned = this.deepClone.clone({req})
        const builtLog = this.logObjectBuilder.buildLogObjectOfRequest(cloned.req)
        return builtLog
    }

    composeResponseLogObject(req: request & IHaveStartTime, res: response) : IPbResponseLogObject{
        const cloned = this.deepClone.clone({req, res})
        const builtLog = this.logObjectBuilder.buildLogObjectOfResponse(cloned.req ,cloned.res)
        return builtLog
    }

    composeRequestErrorLogObject(req: request, err: err):IPbRequestErrorLogObject{
        const cloned = this.deepClone.clone({req, err})
        const builtLog = this.logObjectBuilder.buildLogObjectOfRequestError(cloned.req, cloned.err)
        return builtLog
    }

    composeResponseErrorLogObject(req: request & IHaveStartTime, res: response, err: err):IPbResponseErrorLogObject{
        const cloned = this.deepClone.clone({req, res, err})
        const builtLog = this.logObjectBuilder.buildLogObjectOfResponseError(cloned.req, cloned.res, cloned.err)
        return builtLog
    }

    addPropertiesToOriginalRequest(req: request): asserts req is request & IHaveStartTime {
        (req as request & IHaveStartTime).startTime = process.hrtime()
    }
}


