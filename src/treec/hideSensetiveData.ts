import { IEncryptor } from "./symetricEncriptor";

export interface ISensativeValuesEncryptor < T extends {
    [key: string]: any
} > {
    encrypt: (obj: T) => T,
    decrypt: (obj: T) => T,
}

export interface ISensativeValuesEncryptorConfigs {
    blackListOfKeys: Array < string > ,
        encryptor: IEncryptor
}

export class SensativeValuesEncryptor < T > implements ISensativeValuesEncryptor < T > {

    private static instance: SensativeValuesEncryptor < any > | null = null;
    private blackListOfKeys: Array < string > ;
    private encryptor: IEncryptor;
    private encryptedSufix = "_encryptedProperty"

    private constructor(configs: ISensativeValuesEncryptorConfigs) {
        this.blackListOfKeys = configs.blackListOfKeys;
        this.encryptor = configs.encryptor;
    }

    public static getInstance(configs:
    ISensativeValuesEncryptorConfigs): SensativeValuesEncryptor < any > {
            if (!SensativeValuesEncryptor.instance) {
                SensativeValuesEncryptor.instance = new SensativeValuesEncryptor(configs);
            }
            return SensativeValuesEncryptor.instance;
        }

    encrypt(object: T): T {
        const encryptSensitiveProperty = (object: {
            [key: string]: any
        }, key: string) => {
            const asString = this.strigify(object[key])
            const encrypted = this.encryptor.encrypt(asString)
            object[key + "_encrypted"] = encrypted
            delete object[key]
        }
        this.iterate(object, encryptSensitiveProperty)
        return object
    }

    decrypt(object: T): T {
        const decryptProperty = (object: {
            [key: string]: any
        }, key: string) => {
            object[key] = this.encryptor.decrypt(object[key])
        }
        this.iterate(object, decryptProperty)
        return object
    }

    private iterate = (
        object: {
            [key: string]: any
        },
        handleSensitiveProperty: (object: {
            [key: string]: any
        }, key: string) => void
    ) => {
        for (let key in object) {
            if (!object.hasOwnProperty(key)) continue;
            if (this.blackListOfKeys.includes(key) || key.endsWith(this.encryptedSufix)) {
                handleSensitiveProperty(object, key)
                continue
            }
            if (typeof (object[key]) == "object")
                this.iterate(object[key], handleSensitiveProperty)
        }
    }

    private strigify(value: any): string {
        try {
            const asString = (typeof (value) == "object") ? JSON.stringify(value) : (value + "")
            return asString
        } catch (error) {
            return "could not stringify"
        }
    }
}
