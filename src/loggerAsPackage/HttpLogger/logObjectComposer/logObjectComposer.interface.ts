import { IPbRequestErrorLogObject, IPbRequestLogObject, IPbResponseErrorLogObject, IPbResponseLogObject } from "../pbHttpLogObjects.interfaces"


export interface ILogObjectComposer<request extends keyable, response, error> {
    composeRequestLogObject :  (req: request) => IPbRequestLogObject
    composeResponseLogObject : (req: request, res: response) => IPbResponseLogObject,
    composeRequestErrorLogObject : (req: request, err: error) => IPbRequestErrorLogObject,
    composeResponseErrorLogObject : (req : request, res: response, err: error ) => IPbResponseErrorLogObject,
}

