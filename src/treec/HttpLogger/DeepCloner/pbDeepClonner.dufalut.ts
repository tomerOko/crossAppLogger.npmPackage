import klona from 'klona'
import { IDeepCloner } from './pbDeepClonner.interface';

export class PbDeepClonnerDefault implements IDeepCloner{
    clone<T>(obj:T):T{
        return klona.klona(obj)
    }}