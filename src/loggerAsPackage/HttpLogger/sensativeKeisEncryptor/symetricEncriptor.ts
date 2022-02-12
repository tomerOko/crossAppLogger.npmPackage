import crypto from 'crypto'

export interface IEncryptor {
    encrypt: (text: string) => string,
    decrypt: (text: string) => string,
}

export class SymetricEncryptor implements IEncryptor {

    private key: Buffer;
    private iv: Buffer;
    private algorithm: string = 'aes-256-cbc';
    private cipher: crypto.Cipher;
    private decipher: crypto.Decipher;

    constructor(key: Buffer, iv: Buffer) {
        this.key = key;
        this.iv = iv;
        this.cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        this.decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv)
    }

    public static createIV(someString: string) {
        const resizedIV = Buffer.allocUnsafe(16);
        const iv = crypto.createHash('sha256').update(someString).digest();
        iv.copy(resizedIV);
        return resizedIV
    }

    encrypt(text: string): string {
        this.cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = this.cipher.update(text);
        encrypted = Buffer.concat([encrypted, this.cipher.final()]);
        return encrypted.toString('hex')
    }

    decrypt(text: string): string {
        this.decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv)
        let dec = this.decipher.update(text, 'hex', 'utf8')
        dec += this.decipher.final('utf8');
        return dec;
    }
}
