export interface ISymetricIncryptor{
    encrypt:(object:object)=>object
}

export class ISymetricIncryptorMock implements ISymetricIncryptor{
    encrypt(object: object):object{
        return object
    }
}