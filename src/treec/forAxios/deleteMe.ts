import axios, {AxiosRequestConfig, AxiosRequestHeaders, AxiosRequestTransformer, AxiosResponse, AxiosResponseHeaders, Method } from "axios";
import { IncomingHttpHeaders, OutgoingHttpHeaders } from "http";

export const axiosTest = () => {
    axios.post("http://localhost:3000/dd",{hallow:"word"}).then((a)=>{
    })
}

interface IAxiosInterceptorRequestObject extends AxiosRequestConfig{
    headers?: AxiosRequestHeaders,
    method?: Method,
    url?: string,
    data?: any,
}

export interface IAxiosILogRequestProps{
    requestID:{
        uId: string,
        transactionUid: string
    },
    HttpProps: {
        params?: {[key: string]: string},
        query?: {[key: string]: any},
        ip?: string,
    },
} 



export interface IAxiosILogRequestErrorProps{
    requestID:{
        uId: string,
        transactionUid: string
    },
    HttpProps: {    
        requestTo: string, // function, url to microservice name / url
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







export interface IAxiosILogResponseProps {
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


export interface IAxiosILogResponseErrorProps{
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










/**
 * @param data is the body of the request
 * @param headers is just an object of type {[key:string]:string | number | boolean}
 */
interface IAxiosInterceptorRequestObject extends AxiosRequestConfig{
    headers?: AxiosRequestHeaders,
    method?: Method,
    url?: string,
    data?: any
}

/**
 * @param data is the body of the response
 * @param headers is just an object of type {[key:string]:string | number | boolean}
 */
export interface IAxiosInterceptorResponseObject extends AxiosResponse<any, any>  {
    data: any;
    status: number;
    statusText: string;
    headers: AxiosResponseHeaders;
    config: IAxiosInterceptorRequestObject;
    request?: any;
  }


// Add a response interceptor
axios.interceptors.response.use(function (response:IAxiosInterceptorResponseObject) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("++++++++++++++++++++")
    // console.log(response)
    return response;
  }, function (error) {
    console.log("--------------------")
    console.log(Object.keys(error.response))
    // console.log(error.response)`
    // return Promise.reject(error);
  });