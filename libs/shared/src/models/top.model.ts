import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Top {
  @Field(() => Float, {
    description: "Server's CPU usage.",
    nullable: false,
  })
  cpu: number;

  // @Field(() => Float, {
  //   description: "Server's memory usage.",
  //   nullable: false,
  // })
  // memory: number;

  // @Field(() => Float, {
  //   description: "Server's swap usage.",
  //   nullable: false,
  // })
  // swap: number;
}

// export enum CpuState {
//   FREE,
//   IN_USE,
// }

// registerEnumType(CpuState, {
//   description: 'How CPU usage should be returned',
//   name: 'CpuState',
// });

// export enum Unit {
//   BYTE,
//   KILOBYTE,
//   MEGABYTE,
//   GIGABYTE,
// }

// registerEnumType(Unit, {
//   description: 'Supported units for stats',
//   name: 'Unit',
// });
