import { IPbRequestErrorLogObject, IPbRequestLogObject, IPbResponseErrorLogObject, IPbResponseLogObject } from "../httpLogObjects.interfaces"
import { IDeepCloner } from "./DeepCloner/pbDeepClonner.interface";
import { IHttpLogObjectBuilder } from "./httpLogObjectBuilder/httpLogObjectBuilder.interface";


export interface ILogObjectComposer {
    composeRequestLogObject :  (req: any) => IPbRequestLogObject
    composeResponseLogObject : (req: any, res: any) => IPbResponseLogObject,
    composeRequestErrorLogObject : (req: any, err: any) => IPbRequestErrorLogObject,
    composeResponseErrorLogObject : (req : any, res: any, err: any ) => IPbResponseErrorLogObject,
}

// export interface ILogObjectComposer<request extends keyable, response, error> {
//     composeRequestLogObject :  (req: request) => IPbRequestLogObject
//     composeResponseLogObject : (req: request, res: response) => IPbResponseLogObject,
//     composeRequestErrorLogObject : (req: request, err: error) => IPbRequestErrorLogObject,
//     composeResponseErrorLogObject : (req : request, res: response, err: error ) => IPbResponseErrorLogObject,
// }

// export class LogObjectComposerMock<request, response, err> implements ILogObjectComposer<any, any, any> {
    
//     private deepClone: IDeepCloner;
//     private logObjectBuilder : IHttpLogObjectBuilder<request, response, err, IHaveStartTime>;

//     constructor(logObjectBuilder : IHttpLogObjectBuilder<request, response, err, IHaveStartTime>, deepClone: IDeepCloner){
//         this.deepClone = deepClone;
//         this.logObjectBuilder = logObjectBuilder;
//     }

//     composeRequestLogObject(req: any):IPbRequestLogObject{
//         const cloned = this.deepClone.clone({req})
//         const builtLog = this.logObjectBuilder.buildLogObjectOfRequest(cloned.req)
//         return builtLog
//     }

//     composeResponseLogObject(req: request, res: response) : IPbResponseLogObject{
//         const cloned = this.deepClone.clone({req, res})
//         const builtLog = this.logObjectBuilder.buildLogObjectOfResponse(cloned.req as request & IHaveStartTime ,cloned.res)
//         return builtLog
//     }

//     composeRequestErrorLogObject(req: request, err: err):IPbRequestErrorLogObject{
//         const cloned = this.deepClone.clone({req, err})
//         const builtLog = this.logObjectBuilder.buildLogObjectOfRequestError(cloned.req, cloned.err)
//         return builtLog
//     }

//     composeResponseErrorLogObject(req: request, res: response, err: err):IPbResponseErrorLogObject{
//         const cloned = this.deepClone.clone({req, res, err})
//         const builtLog = this.logObjectBuilder.buildLogObjectOfResponseError(cloned.req as request & IHaveStartTime, cloned.res, cloned.err)
//         return builtLog
//     }
// }


