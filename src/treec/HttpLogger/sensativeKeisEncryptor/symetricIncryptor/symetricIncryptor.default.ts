import { ISymetricIncryptorMock } from "./symetricIncryptor.interface";

export class SymetricIncryptorMock implements ISymetricIncryptorMock{
    encrypt(object: object):object{
        return object
    }
}