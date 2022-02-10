import { Response } from "express"
import { IPbHttpLogger } from "../pbHttpLogger.interface";
import { ISensativeValuesEncryptor } from "../sensativeValuesEncryptor.interface"
import { IPbExpressRequest } from "./pbExpressRequest";
import { ILogObjectBuilderForExpress } from "./PbHttpLogObjectBuilderForExpress";

export interface IPbHttpLoggerForExpress extends IPbHttpLogger<IPbExpressRequest, Response, Error>{}

export class pbHttpLoggerForExpress implements IPbHttpLoggerForExpress {
    
    private logObjectBuilder : ILogObjectBuilderForExpress;
    private sensativeValuesEncryptor : ISensativeValuesEncryptor

    constructor(logObjectBuilder : ILogObjectBuilderForExpress, sensativeValuesEncryptor : ISensativeValuesEncryptor){
        this.logObjectBuilder = logObjectBuilder;
        this.sensativeValuesEncryptor =  sensativeValuesEncryptor;
    }

    logRequest(req: IPbExpressRequest):void{
        const logObject = this.logObjectBuilder.buildLogObjectOfRequest(req)
        const encryptedLogObject = this.sensativeValuesEncryptor.encrypt(logObject)
    }

    logResponse(req: IPbExpressRequest, res: Response):void{
        const logObject = this.logObjectBuilder.buildLogObjectOfResponse(req ,res)
        const encryptedLogObject = this.sensativeValuesEncryptor.encrypt(logObject)
    }

    logRequestError(req: IPbExpressRequest, err: Error):void{
        const logObject = this.logObjectBuilder.buildLogObjectOfRequestError(req, err)
        const encryptedLogObject = this.sensativeValuesEncryptor.encrypt(logObject)
    }

    logResponseError(req : IPbExpressRequest, res: Response, err: Error ):void{
        const logObject = this.logObjectBuilder.buildLogObjectOfResponseError(req, res, err)
        const encryptedLogObject = this.sensativeValuesEncryptor.encrypt(logObject)
    }

}

