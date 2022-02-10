export interface IDeepCloner{
    clone: {<Type>(arg: Type): Type}
}

export class IDeepClonerMock implements IDeepCloner{
    clone<T>(obj:T):T{
        return obj
    }
}