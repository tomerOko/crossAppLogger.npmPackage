import { IgetServiceNameByUrl } from "./getServiceNameByUrl.interface";

class GetServiceNameByUrl implements IgetServiceNameByUrl{

    private identifiers:Map<string, string>;

    constructor(identifiers:Map<string, string>){
        this.identifiers=identifiers
    }

    getServiceNameByUrl(url: string):string{
        this.identifiers.forEach(identifier=>{
            if(url.includes(identifier)) return identifier
        })
        return 'no identifier found'
    }
}

