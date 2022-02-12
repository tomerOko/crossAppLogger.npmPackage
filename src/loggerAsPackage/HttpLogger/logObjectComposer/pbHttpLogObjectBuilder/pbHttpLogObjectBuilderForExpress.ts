import { Request, Response} from "express"
import { IPbRequestErrorLogObject, IPbRequestLogObject, IPbResponseErrorLogObject, IPbResponseLogObject } from "../../pbHttpLogObjects.interfaces"
import { pbHttpLogObjectBuilder } from "./pbHttpLogObjectBuilder.interface";
import { IRequestHandlingDurationCalculator } from "./durationCalculator/durationCalculator.interface";


export interface IPbExpressRequest extends Request{
    uId:string;
    transactionUid:string;
    senderName:string
}


export class PbHttpLogObjectBuilderForExpress implements pbHttpLogObjectBuilder<IPbExpressRequest, Response, Error, IHaveStartTime> {

    private serviceName:string;
    private reqTime: IRequestHandlingDurationCalculator;

    constructor(serviceName: string, durationCalculator: IRequestHandlingDurationCalculator){
        this.serviceName = serviceName;
        this.reqTime = durationCalculator;
    }
   
    buildLogObjectOfRequest(req: IPbExpressRequest):IPbRequestLogObject{
        this.addPropertiesToOriginalRequest(req)
        const logObject: IPbRequestLogObject = {
            type:"REQUEST",
            ...this.commonProps(req),
            HttpProps: {
                ...this.requestHttpProps(req)
            },
            ...this.commonProps(req)
        }
        return logObject
    }

    buildLogObjectOfResponse(req: IPbExpressRequest & IHaveStartTime, res: Response):IPbResponseLogObject{
        const logObject: IPbResponseLogObject = {
            type:"VALID RESPONSE",
            HttpProps: {
                ...this.responseHttpProps(req, res)
            },
            ...this.commonProps(req)
        }
        return logObject
    }

    buildLogObjectOfRequestError(req: IPbExpressRequest, err: Error):IPbRequestErrorLogObject{
        const logObject: IPbRequestErrorLogObject = {
            type:"INVALID REQUEST",
            HttpProps: {
                ...this.requestHttpProps(req),
                ...this.errorbuilder(err)
            },
            ...this.commonProps(req)
        }
        return logObject
    }

    buildLogObjectOfResponseError(req : IPbExpressRequest & IHaveStartTime, res: Response, err: Error ):IPbResponseErrorLogObject{
        const logObject: IPbResponseErrorLogObject = {
            type:"VALID RESPONSE",
            HttpProps: {
                ...this.responseHttpProps(req,res),
                ...this.errorbuilder(err)
            },
            ...this.commonProps(req)
            
        }
        return logObject
    }

    responseHttpProps(req: IPbExpressRequest & IHaveStartTime, res:Response){
        return{
            responseFrom: this.serviceName,
            responseTo:req.senderName,
            headers: res.getHeaders(),
            body: res.json(),
            responseDuration: this.reqTime.durationAsString((req)),
            statusCode: res.statusCode,
        }
    }

    requestHttpProps(req:IPbExpressRequest){
        return{
            requestFrom: req.senderName, 
            requestTo: this.serviceName,
            headers: req.headers,
            params: req.params,
            query: req.query,
            body: req.body,
            ip: req.ip,
        }
    }

    errorbuilder(err: Error){
        return{
            errorMessage:err.message,
            errorName:err.name,
            errorStack:err.stack
        }
    }

    commonProps(req:IPbExpressRequest){
        return{
            requestID:{
                uId: req.uId, 
                transactionUid: req.transactionUid
            },
            originalURL: req.originalUrl,
            Method: req.method,
            message: "",
            level:"",
        }
    }

    addPropertiesToOriginalRequest(req: IPbExpressRequest):asserts req is IPbExpressRequest & IHaveStartTime{
        (req as IPbExpressRequest & IHaveStartTime).startTime = process.hrtime()
    }
}
