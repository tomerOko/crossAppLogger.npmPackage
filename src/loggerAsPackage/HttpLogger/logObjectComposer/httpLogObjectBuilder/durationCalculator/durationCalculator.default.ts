export interface IDurationCalculator{
    calculateDuration:(toBeMeasured:IHaveStartTime)=>number,
    durationAsString:(toBeMeasured:IHaveStartTime)=>string
}

export class DurationCalculator implements IDurationCalculator{
    calculateDuration(toBeMeasured: IHaveStartTime):number{
        const Milliseconds = process.hrtime(toBeMeasured.startTime)[0]
        return Milliseconds
    }
    durationAsString(toBeMeasured: IHaveStartTime):string{
        return `${this.calculateDuration(toBeMeasured)} (Ms)`
    }
}

