import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { ErrorRequestHandler, Request, Response } from "express"
import { IPbRequestErrorLogData, IPbRequestLogData, IPbResponseErrorLogData, IPbResponseLogData } from "./pbHttpLogData.interface"

export interface pbHttpLogDataBuilder<request, response, error> {
    buildLogObjectOfRequest : (req: request) => IPbRequestLogData,
    buildLogObjectOfResponse : (req: request, res: response) => IPbResponseLogData,
    buildLogObjectOfRequestError : (req: request, err: error) => IPbRequestErrorLogData,
    buildLogObjectOfResponseError : (req : request, res: response, err: error ) => IPbResponseErrorLogData
}

export interface logObjectBuilderForAxios extends pbHttpLogDataBuilder<AxiosRequestConfig, AxiosResponse, AxiosError> {}

export class PbHttpLogDataBuilderMock implements pbHttpLogDataBuilder<any, any, any>{

    private static singletonInstance:PbHttpLogDataBuilderMock;
    private constructor(){}

    public static getInstance():PbHttpLogDataBuilderMock{
        if (!PbHttpLogDataBuilderMock.singletonInstance){
            PbHttpLogDataBuilderMock.singletonInstance=new PbHttpLogDataBuilderMock()
        }
        return PbHttpLogDataBuilderMock.singletonInstance
    }

    buildLogObjectOfRequest(req: any):IPbRequestLogData{
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

    buildLogObjectOfResponse(req: any, res: any):IPbResponseLogData{
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
    

    buildLogObjectOfRequestError(req: any, err: any):IPbRequestErrorLogData{
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

    buildLogObjectOfResponseError(req :any, res: any, err: any ):IPbResponseErrorLogData{
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

}
