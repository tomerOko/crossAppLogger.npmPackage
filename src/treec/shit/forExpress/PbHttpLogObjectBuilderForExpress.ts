import { Response} from "express"
import { IPbRequestErrorLogData, IPbRequestLogData, IPbResponseErrorLogData, IPbResponseLogData } from "../../pbHttpLogObjects.interfaces"
import { pbHttpLogDataBuilder } from "../../HttpLogger/pbHttpLogObjectBuilder/pbHttpLogObjectBuilder.interface"
import { IPbExpressRequest } from "./pbExpressRequest";


interface IDurationCalculator<T>{
    setStartTime:(toBeMeasured:T)=>T,
    calculateDuration:(toBeMeasured:T)=>number,
    defualtDurationFormat:(toBeMeasured:T)=>string
}

export class PbHttpLogObjectBuilderForExpress implements pbHttpLogDataBuilder<IPbExpressRequest, Response, Error> {

    private serviceName:string;
    private reqTime: IDurationCalculator<IPbExpressRequest>;

    constructor(serviceName: string, durationCalculator: IDurationCalculator<IPbExpressRequest>){
        this.serviceName = serviceName;
        this.reqTime = durationCalculator;
    }
   
    buildLogObjectOfRequest(req: IPbExpressRequest):IPbRequestLogData{

        this.reqTime.setStartTime(req)

        const logObject: IPbRequestLogData = {
            type:"REQUEST",
            ...this.commonProps(req),
            HttpProps: {
                ...this.requestHttpProps(req)
            },
            ...this.commonProps(req)
        }
        return logObject
    }

    buildLogObjectOfResponse(req: IPbExpressRequest, res: Response):IPbResponseLogData{
        const logObject: IPbResponseLogData = {
            type:"VALID RESPONSE",
            HttpProps: {
                ...this.responseHttpProps(req, res)
            },
            ...this.commonProps(req)
        }
        return logObject
    }

    buildLogObjectOfRequestError(req: IPbExpressRequest, err: Error):IPbRequestErrorLogData{
        const logObject: IPbRequestErrorLogData = {
            type:"INVALID REQUEST",
            HttpProps: {
                ...this.requestHttpProps(req),
                ...this.errorbuilder(err)
            },
            ...this.commonProps(req)
        }
        return logObject
    }

    buildLogObjectOfResponseError(req : IPbExpressRequest, res: Response, err: Error ):IPbResponseErrorLogData{
        const logObject: IPbResponseErrorLogData = {
            type:"VALID RESPONSE",
            HttpProps: {
                ...this.responseHttpProps(req,res),
                ...this.errorbuilder(err)
            },
            ...this.commonProps(req)
            
        }
        return logObject
    }

    responseHttpProps(req: IPbExpressRequest, res:Response){
        return{
            responseFrom: this.serviceName,
            responseTo:req.senderName,
            headers: res.getHeaders(),
            body: res.json(),
            responseDuration: this.reqTime.defualtDurationFormat((req)),
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
}
