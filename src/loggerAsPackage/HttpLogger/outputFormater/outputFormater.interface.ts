export interface IOutputFormater<T>{
    log:(data:T)=>void
}

export class IOutputFormaterMock implements IOutputFormater<any>{
    log(data: any){
        console.log(data)
    }
}