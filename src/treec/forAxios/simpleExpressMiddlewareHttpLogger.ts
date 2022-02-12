import { Request, Response } from "express";
import { IExpressHttpLogger } from "./expressHttpLogger.interface";
import { IExpressMiddlewareHttpLogger } from "./expressMiddlawareLogger.interface";

export class simpleExpressMiddlewareHttpLogger implements IExpressMiddlewareHttpLogger{

    private logger: IExpressHttpLogger;

    constructor(logger :  IExpressHttpLogger){
        this.logger = logger;
    }
    
    public logReqResAndErrors(req: Request, res: Response ) : void{
        this.logger.logRequest(req)
        req.on("error", (e)=>{this.logger.logRequestError(req, e)})
        res.on("finish",()=>{ res.statusCode<400? this.logger.logResponse(req, res) : null } )//todo investigate 'finish' implamentation, probbaly 'finish' catches errors as well
        req.on("error", (e) => {this.logger.logResponseError(req, res, e)})
    }

}

