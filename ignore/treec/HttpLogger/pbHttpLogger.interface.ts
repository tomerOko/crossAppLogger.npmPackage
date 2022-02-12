export interface IPbHttpLogger <request, response, error>{
    logRequest : (req: request) => void,
    logResponse : (req: request, res: response) => void,
    logRequestError : (req: request, err: error) => void, 
    logResponseError : (req : request, res: response, err: error ) => void,
}

export class PbHttpLoggerMock implements IPbHttpLogger<any, any, any>{

    private constructor(){}
    private static singeltonInstance: PbHttpLoggerMock;
    public static getInstance(configs:any):PbHttpLoggerMock{
        if(!PbHttpLoggerMock.singeltonInstance){
            PbHttpLoggerMock.singeltonInstance = new PbHttpLoggerMock()
        }
        return PbHttpLoggerMock.singeltonInstance
    }

    logRequest(req:any):void{console.log(req)}
    logResponse(req: any, res: any):void{console.log(req,res)}
    logRequestError(req: any, err: any):void{console.log(req, err)}
    logResponseError(req : any, res: any, err: any ){console.log(req, res,err)}

}