// interface Payload {
//     weight: number;
// }
// interface Stage {
//     engines: Engine[];
// }
// interface Rocket {
//     payload: Payload;
//     stages: Stage[];
// }



// class Client {
//     buildRocket<T extends Rocket>(
//         factory: RocketFactory<T>
//     ): T {
//         let rocket = factory.createRocket();
//         rocket.payload = factory.createPayload();
//         rocket.stages = factory.createStages();
//         return rocket;
//     }
// }

// interface RocketFactory < T extends Rocket > {
//     createRocket(): T;
//     createPayload(): Payload;createStages(): Stage[];
// }


// class ExperimentalRocket implements Rocket {}
// class ExperimentalRocketFactory
// implements RocketFactory < ExperimentalRocket > {}

// let client = new Client();
// let factory = new ExperimentalRocketFactory();
// let rocket = client.buildRocket(factory);

// class ExperimentalPayload implements Payload {
//     weight: number;
// }
// [76]

// Creational Design Patterns
// class ExperimentalRocketStage implements Stage {
//     engines: Engine[];
// }
// class ExperimentalRocket implements Rocket {
//     payload: ExperimentalPayload;
//     stages: [ExperimentalRocketStage];
// }

// class ExperimentalRocketFactory
// implements RocketFactory < ExperimentalRocket > {
//     createRocket(): ExperimentalRocket {
//         return new ExperimentalRocket();
//     }
//     createPayload(): ExperimentalPayload {
//         return new ExperimentalPayload();
//     }
//     createStages(): [ExperimentalRocketStage] {
//         return [new ExperimentalRocketStage()];
//     }
// }

// class Satellite implements Payload {
//     constructor(
//         public id: number,
//         public weight: number) {}
// }
// class FreightRocketFirstStage implements Stage {
//     engines: Engine[];
// }
// class FreightRocketSecondStage implements Stage {
//     engines: Engine[];
// }
// type FreightRocketStages = ∏∏