import { IncomingHttpHeaders, OutgoingHttpHeaders } from "http";
 

export interface ILogGeneralProperties<T extends ILogRequestProps | ILogResponseProps | ILogRequestErrorProps | ILogResponseErrorProps >{
    type:"REQUEST" | "VALID RESPONSE" | "ERROR RESPONSE" | "INVALID REQUEST",
    requestID:{
        uId: string,
        transactionUid: string
    },
    HttpProps: T,
    originalURL: string,
    Method: "GET" | "POST" | "UPDATE" | "DELETE" | string,
    message: string,
    level:string,
    [key: string] : any,
} 



interface ILogRequestProps {
    requestFrom: string,
    requestTo: string,
    headers: IncomingHttpHeaders,
    params?: {[key: string]: string},
    query?: {[key: string]: any},
    body?: any,
    ip?: string,
}
interface ILogResponseProps {
    responseFrom: string,
    responseTo: string,
    responseDuration: string,
    statusCode: number | undefined,
    headers: OutgoingHttpHeaders,
    body: any
}
interface ILogErrorProps{
  errorName: string,
  errorMessage: string,
  errorStack: string | undefined,
}
interface ILogRequestErrorProps extends ILogRequestProps, ILogErrorProps{}
interface ILogResponseErrorProps extends ILogResponseProps, ILogErrorProps{}



export interface IPbRequestLogObject extends ILogGeneralProperties<ILogRequestProps>{}
export interface IPbResponseLogObject extends ILogGeneralProperties<ILogResponseProps>{}
export interface IPbRequestErrorLogObject extends ILogGeneralProperties<ILogRequestErrorProps>{}
export interface IPbResponseErrorLogObject extends ILogGeneralProperties<ILogResponseErrorProps>{}

export type IPbHttpLogObjects = IPbRequestLogObject | IPbResponseLogObject |IPbRequestErrorLogObject | IPbResponseErrorLogObject
