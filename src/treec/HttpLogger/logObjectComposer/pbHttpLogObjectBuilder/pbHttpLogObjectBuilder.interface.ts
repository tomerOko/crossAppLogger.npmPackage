import { IPbRequestErrorLogObject, IPbRequestLogObject, IPbResponseErrorLogObject, IPbResponseLogObject } from "../../pbHttpLogObjects.interfaces"


export interface pbHttpLogObjectBuilder<request, response, error, additionalData = request> {
    buildLogObjectOfRequest : (req: request) => IPbRequestLogObject,
    buildLogObjectOfResponse : (req: request & additionalData, res: response) => IPbResponseLogObject,
    buildLogObjectOfRequestError : (req: request, err: error) => IPbRequestErrorLogObject,
    buildLogObjectOfResponseError : (req : request & additionalData, res: response, err: error ) => IPbResponseErrorLogObject,
}


export class PbHttpLogObjectBuilderMock implements pbHttpLogObjectBuilder<any, any, any>{

    private static singletonInstance:PbHttpLogObjectBuilderMock;
    private constructor(){}

    public static getInstance():PbHttpLogObjectBuilderMock{
        if (!PbHttpLogObjectBuilderMock.singletonInstance){
            PbHttpLogObjectBuilderMock.singletonInstance=new PbHttpLogObjectBuilderMock()
        }
        return PbHttpLogObjectBuilderMock.singletonInstance
    }

    buildLogObjectOfRequest(req: any):IPbRequestLogObject{
        return{
            HttpProps:{
                headers:{some:"header"},
                requestFrom:"this server",
                requestTo:"some other server",
                body:{body:"props"},   
             },
             Method:"probubly crud",
             level:"error",
             message:"hallow world",
             originalURL:"google.facbood.amazon.tesla.com",
             requestID:{
                 transactionUid:"1234567890",
                 uId:"0987654321"
             },
             type:"REQUEST"
        }
    }

    buildLogObjectOfResponse(req: any, res: any):IPbResponseLogObject{
        return{
            HttpProps:{
                headers:{some:"header"},
                responseTo:"this server",
                responseFrom:"some other server",
                body:{body:"props"},   
                responseDuration:"0.0001ms",
                statusCode:200
             },
             Method:"probubly crud",
             level:"error",
             message:"hallow world",
             originalURL:"google.facbood.amazon.tesla.com",
             requestID:{
                 transactionUid:"1234567890",
                 uId:"0987654321"
             },
             type:"VALID RESPONSE"
        }
    }
    

    buildLogObjectOfRequestError(req: any, err: any):IPbRequestErrorLogObject{
        return{
            HttpProps:{
                headers:{some:"header"},
                requestFrom:"this server",
                requestTo:"some other server",
                body:{body:"props"},  
                errorMessage:"some problem sending the request",
                errorName:"bed bad",
                errorStack:"[first function, second function]"
             },
             Method:"probubly crud",
             level:"error",
             message:"hallow world",
             originalURL:"google.facbood.amazon.tesla.com",
             requestID:{
                 transactionUid:"1234567890",
                 uId:"0987654321"
             },
             type:"INVALID REQUEST"
        }
    }

    buildLogObjectOfResponseError(req :any, res: any, err: any ):IPbResponseErrorLogObject{
        return{
            HttpProps:{
                headers:{some:"header"},
                responseTo:"this server",
                responseFrom:"some other server",
                body:{body:"props"},   
                responseDuration:"0.0001ms",
                statusCode:407,
                errorMessage:"some problem sending the request",
                errorName:"bed bad",
                errorStack:"[first function, second function]"
             },
             Method:"probubly crud",
             level:"error",
             message:"hallow world",
             originalURL:"google.facbood.amazon.tesla.com",
             requestID:{
                 transactionUid:"1234567890",
                 uId:"0987654321"
             },
             type:"ERROR RESPONSE"
        }
    }


    setStartTime<T extends keyable>(toBeMeasured: T & Partial<IHaveStartTime>): T & IHaveStartTime {
        toBeMeasured.startTime= process.hrtime()
        return toBeMeasured as T & IHaveStartTime
    }

}


