export interface IRequestHandlingDurationCalculator{
    setStartTime<G>(toBeMeasured:G): G & IWithStartTime,
    calculateDuration:(toBeMeasured:IWithStartTime)=>number,
    durationAsString:(toBeMeasured:IWithStartTime)=>string
}

export interface IWithStartTime{
    startTime:[number, number]
}