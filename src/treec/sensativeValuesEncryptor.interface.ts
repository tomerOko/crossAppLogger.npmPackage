export interface ISensativeValuesEncryptor{
    encrypt: (data: {[ key:string ]: any}) => {[ key:string ]: any}
}

