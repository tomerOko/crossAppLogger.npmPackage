export interface ISensativeValuesEncryptor{
    encrypt: (data:{[ key:string ]: any}) => {[ key:string ]: any}
}

export class ISensativeValuesEncryptorMock implements ISensativeValuesEncryptor{

    encrypt(data: { [key: string]: any; }):{ [key: string]: any; }{
        return data
    }
}

