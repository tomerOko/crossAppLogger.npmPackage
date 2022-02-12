interface keyable {[key: string]: any}
type IWithStartTime<T extends keyable> = IHaveStartTime & T
type IHaveStartTime = {startTime:[number, number]}