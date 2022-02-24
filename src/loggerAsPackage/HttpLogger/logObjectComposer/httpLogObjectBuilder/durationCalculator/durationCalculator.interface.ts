export interface IRequestHandlingDurationCalculator{
    calculateDuration:(toBeMeasured:IHaveStartTime)=>number,
    durationAsString:(toBeMeasured:IHaveStartTime)=>string
}

export class IRequestHandlingDurationCalculatorMock implements IRequestHandlingDurationCalculator{
    calculateDuration(toBeMeasured: IHaveStartTime):number{
        return 5.456
    }
    durationAsString(toBeMeasured: IHaveStartTime):string{
        return `duration of ${this.calculateDuration(toBeMeasured)} milliseconds`
    }
}
