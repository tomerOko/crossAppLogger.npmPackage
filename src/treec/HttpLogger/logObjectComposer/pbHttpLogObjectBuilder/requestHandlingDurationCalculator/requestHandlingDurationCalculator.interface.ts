export interface IRequestHandlingDurationCalculator{
    setStartTime<G>(toBeMeasured:G):  IHaveStartTime & G,
    calculateDuration:(toBeMeasured:IHaveStartTime)=>number,
    durationAsString:(toBeMeasured:IWithStartTime<& keyable>)=>string
}

export class IRequestHandlingDurationCalculatorMock implements IRequestHandlingDurationCalculator{

    setStartTime<G>(toBeMeasured: G): IHaveStartTime & G {
        
    }
}
