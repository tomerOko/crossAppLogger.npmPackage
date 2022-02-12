import { IncomingHttpHeaders, OutgoingHttpHeaders } from "http";

export interface ILogRequestProps{
    requestID:{
        uId: string,
        transactionUid: string
    },
    HttpProps: {
        requestFrom: string,
        requestTo: string,
        headers: IncomingHttpHeaders,
        params?: {[key: string]: string},
        query?: {[key: string]: any},
        body?: any,
        ip?: string,
    },
    originalURL: string,
    Method: "GET" | "POST" | "UPDATE" | "DELETE" | string,
} 

export interface ILogRequestErrorProps{
    requestID:{
        uId: string,
        transactionUid: string
    },
    HttpProps: {    
        requestFrom: string,
        requestTo: string,
        headers: IncomingHttpHeaders,
        params?: {[key: string]: string},
        query?: {[key: string]: any},
        body?: any,
        ip?: string,
        errorName: string,
        errorMessage: string,
        errorStack: string | undefined
    },
    originalURL: string,
    Method: "GET" | "POST" | "UPDATE" | "DELETE" | string,
} 







export interface ILogResponseProps {
    requestID:{
        uId: string,
        transactionUid: string
    },
    HttpProps: {
        responseFrom: string,
        responseTo: string,
        responseDuration: string,
        statusCode: number | undefined,
        headers: OutgoingHttpHeaders,
        body: any
    },
    originalURL: string,
    Method: "GET" | "POST" | "UPDATE" | "DELETE" | string,
} 


export interface ILogResponseErrorProps{
    requestID:{
        uId: string,
        transactionUid: string
    },
    HttpProps: {
        responseFrom: string,
        responseTo: string,
        responseDuration: string,
        statusCode: number | undefined,
        headers: OutgoingHttpHeaders,
        body: any,
        errorName: string,
        errorMessage: string,
        errorStack: string | undefined
    },
    originalURL: string,
    Method: "GET" | "POST" | "UPDATE" | "DELETE" | string,
} 





