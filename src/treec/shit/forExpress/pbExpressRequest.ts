import { Request } from "express";

export interface IPbExpressRequest extends Request{
    uId:string;
    transactionUid:string;
    senderName:string
    startTime?:[number,number]
}
