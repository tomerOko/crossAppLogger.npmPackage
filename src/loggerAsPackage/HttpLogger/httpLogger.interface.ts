export interface IHttpLogger{
    logRequest : (req: any) => void,
    logResponse : (req: any, res: any) => void,
    logRequestError : (req: any, err: any) => void, 
    logResponseError : (req : any, res: any, err: any ) => void,
}//types will be inforced in th logic level.

export class HttpLoggerMock implements IHttpLogger{

    private constructor(){}
    private static singeltonInstance: HttpLoggerMock;
    public static getInstance(configs:any):HttpLoggerMock{
        if(!HttpLoggerMock.singeltonInstance){
            HttpLoggerMock.singeltonInstance = new HttpLoggerMock()
        }
        return HttpLoggerMock.singeltonInstance
    }

    logRequest(req:any):void{console.log(req)}
    logResponse(req: any, res: any):void{console.log(req,res)}
    logRequestError(req: any, err: any):void{console.log(req, err)}
    logResponseError(req : any, res: any, err: any ){console.log(req, res,err)}

}