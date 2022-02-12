export interface ISensativeValuesEncryptor{
    encrypt: (data:{[ key:string ]: any}) => {[ key:string ]: any}
}

export class SensativeValuesEncryptor implements ISensativeValuesEncryptor{

    private deepIterator : IDeepIterator

    constructor deep

    encrypt(data: { [key: string]: any; }):{ [key: string]: any; }{
        return data
    }
}

