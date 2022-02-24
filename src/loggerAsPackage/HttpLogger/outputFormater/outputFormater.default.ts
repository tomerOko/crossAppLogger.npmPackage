import { createLogger, format, Logger, transports } from "winston";
import { IOutputFormater } from "./outputFormater.interface";

export const OutputFormaterFactory = <G extends{level: string, message: string}>() => {
 
  class OutputFormater implements IOutputFormater<G> {

    private formater : Logger;
    
    constructor(additionalData: {(key:string):any}){
      this.formater=createLogger({
        format:format.combine(
          format.json(),
          format.prettyPrint(),
        ),
        transports: [
          new transports.Console({format:format.combine(format.colorize())}),
          new transports.File({filename: 'fatureLoggerOutput.log'})
        ],
        defaultMeta: additionalData
      })
    }

    log(data: G):void{
      this.formater.log(data)
    }
  }

  return OutputFormater

} 

    // level: this.configs.highestLevelOfLogging, 
    // levels: this.configs.levels,
      // this.deepCloneOfLoggedData(),
      // this.encryptSensitiveKeys(),
      // format.timestamp({
      //   format: 'YYYY-MM-DD HH:mm:ss'
      // }),
      // format.errors({ stack:l true }),
     