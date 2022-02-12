import { AbstractConfigSetLevels } from 'winston/lib/winston/config';

export interface IPbWinstonLoggerConfigs{
    //todo: make the config object build cleaner. maybe its better as a separeted config file, somthing like typescript, with defaults..
      levels: AbstractConfigSetLevels,
      highestLevelOfLogging:  string, // todo : inforce highestLevelOfLogging to eaqual one of the keys of 'levels' 
      serviceName: string,
}