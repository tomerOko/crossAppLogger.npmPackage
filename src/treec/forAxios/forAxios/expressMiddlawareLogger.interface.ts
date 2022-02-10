import { Request, Response } from "express";

export interface IExpressMiddlewareHttpLogger{
    logReqResAndErrors: (req:Request, res: Response) => void
}