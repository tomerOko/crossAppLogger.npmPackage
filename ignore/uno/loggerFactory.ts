class loggerFactory{
    buildLogger():Logger{
        let newLogger = new Object()
        
            newLogger.encryptor=this.buildEncryptor(),
            newLogger.printer=this.buildPrinter(),
            newLogger.validator=this.buildValidator()
        
    }
    buildEncryptor():Encryptor{
        return new Encryptor("passowrd")
    }
    buildPrinter():Printer{
        return new Printer("my printer", ["ariel","times new roman"])
    }
    buildValidator():Validator{
        return new Validator(["name","password"])
    }
}


class Logger extends Object{ //todo currently have no methods and no primitive properties, only pinter properties
    
    private encryptor:Encryptor;
    private printer:Printer;
    private validator:Validator;

    constructor(encryptor:Encryptor, printer:Printer, validator:Validator){
        super()
        this.encryptor = encryptor
        this.printer = printer
        this.validator = validator
    }
}


class Encryptor{
    
    private password:string

    constructor(password:string){
        this.password=password
    }

    encrypt(value:string){
        return value.replace("a","_")
    }

    decrypt(value:string){
        return value.replace("_","a")
    }

}


class Printer{
    
    private addres:string
    private fonts:Array<string>

    constructor(addres:string, fonts:Array<string>){
        this.fonts=fonts,
        this.addres=addres
    }

    print(data:string){
        console.log(data)
    }
    
}


class Validator{
    
    private needeKeys:Array<string>

    constructor(needeKeys:Array<string>){
        this.needeKeys=needeKeys
    }
    
    validate(toBeLogged:{[key:string]:any}):boolean{
        for(let keyName in this.needeKeys)
            if(!toBeLogged[keyName])
                return false
        return true
    }



}


//todo currently we are using only 2 levels of abstructions, what if 'Encryptor' needs instance of 'sub' class name'd 'chyfer'
/* 
    logger needs:
    encryptor, 
    printer,
    validator,

    more property-like
    

*/