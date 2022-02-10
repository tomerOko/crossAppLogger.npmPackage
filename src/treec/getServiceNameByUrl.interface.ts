export interface IgetServiceNameByUrl{
    convert: (url : string) => string
}

export class mockGetServiceNameByUrl {
    public convert(url:string){
        return 'some service name like auth-manager or shufersal'
    }
}