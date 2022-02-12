import { ErrorRequestHandler, Request, Response } from "express"
import { IHttpLogger } from "../httpLogger.interface"
import { logObjectBuilderForExpress } from "../logObjectBuilders.interface"
import { ISensativeValuesEncryptor } from "../HttpLogger/sensativeKeisEncryptor/sensativeValuesEncryptor.interface"

export class expressHttpLogger implements IHttpLogger<Request, Response, ErrorRequestHandler>{
    
    private objectBuilder : logObjectBuilderForExpress;
    private sensativeValuesEncryptor : ISensativeValuesEncryptor

    constructor(objectBuilder : logObjectBuilderForExpress, sensativeValuesEncryptor : ISensativeValuesEncryptor){
        this.objectBuilder = objectBuilder;
        this.sensativeValuesEncryptor =  sensativeValuesEncryptor;
    }

    logRequest(req: Request):void{}
    logResponse(req: Request, res: Response):void{}
    logRequestError(req: Request, err: ErrorRequestHandler):void{}
    logResponseError(req : Request, res: Response, err: ErrorRequestHandler ):void{}
}

