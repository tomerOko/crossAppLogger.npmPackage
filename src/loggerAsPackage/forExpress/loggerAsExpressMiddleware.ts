import { Response } from "express";
import { IPbExpressRequest } from "../HttpLogger/logObjectComposer/pbHttpLogObjectBuilder/pbHttpLogObjectBuilderForExpress";
import { IPbHttpLogger } from "../HttpLogger/pbHttpLogger.interface";

export interface ILoggerAsExpressMiddleware{
    logReqResAndErrors: (req:IPbExpressRequest, res: Response) => void
}

export class LoggerAsExpressMiddleware implements ILoggerAsExpressMiddleware{

    private logger: IPbHttpLogger <IPbExpressRequest, Response, Error> 
    constructor(logger :IPbHttpLogger <IPbExpressRequest, Response, Error>  ){
        this.logger = logger;
    }
    
    public logReqResAndErrors(req: IPbExpressRequest, res: Response ) : void{
        
        this.logger.logRequest(req)
        req.on("error", (e:Error)=>{this.logger.logRequestError(req, e)})
        res.on("finish",()=>{ res.statusCode<400? this.logger.logResponse(req, res) : null } )//todo investigate 'finish' implamentation, probbaly 'finish' catches errors as well
        res.on("error", (e:Error) => {this.logger.logResponseError(req, res, e)})
   
    }

}
