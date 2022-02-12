import { IPbRequestErrorLogObject, IPbRequestLogObject, IPbResponseErrorLogObject, IPbResponseLogObject } from "../pbHttpLogObjects.interfaces"


export interface ILogObjectComposer<request extends keyable, response, error, additionalData> {
    composeRequestLogObject :  (req: request) => IPbRequestLogObject
    composeResponseLogObject : (req: request & additionalData, res: response) => IPbResponseLogObject,
    composeRequestErrorLogObject : (req: request, err: error) => IPbRequestErrorLogObject,
    composeResponseErrorLogObject : (req : request & additionalData, res: response, err: error ) => IPbResponseErrorLogObject,
    addPropertiesToOriginalRequest: (req: request) => asserts req is request & additionalData,
}

