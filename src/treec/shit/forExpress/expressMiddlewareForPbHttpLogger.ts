import { Response } from "express";
import { IPbHttpLogger } from "../../pbHttpLogger.interface";
import { IPbExpressRequest } from "./pbExpressRequest";
import { IPbHttpLoggerForExpress } from "./pbHttpLoggerForExpress";

export interface IExpressMiddlewareForPbHttpLogger{
    logReqResAndErrors: (req:IPbExpressRequest, res: Response) => void
}

export class ExpressMiddlewareForPbHttpLogger implements IExpressMiddlewareForPbHttpLogger{

    private logger: IPbHttpLoggerForExpress
    constructor(logger :IPbHttpLoggerForExpress ){
        this.logger = logger;
    }
    
    public logReqResAndErrors(req: IPbExpressRequest, res: Response ) : void{
        
        this.logger.logRequest(req)
        req.on("error", (e:Error)=>{this.logger.logRequestError(req, e)})
        res.on("finish",()=>{ res.statusCode<400? this.logger.logResponse(req, res) : null } )//todo investigate 'finish' implamentation, probbaly 'finish' catches errors as well
        res.on("error", (e:Error) => {this.logger.logResponseError(req, res, e)})
   
    }

}
