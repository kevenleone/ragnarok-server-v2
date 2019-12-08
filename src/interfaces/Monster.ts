import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class StatusReference {
  @Field()
  HP: number;

  @Field()
  SP: number;

  @Field()
  EXP: number;

  @Field()
  JEXP: number;

  @Field()
  ATK1: number;

  @Field()
  ATK2: number;

  @Field()
  DEF: number;

  @Field()
  MDEF: number;

  @Field()
  STR: number;

  @Field()
  AGI: number;

  @Field()
  VIT: number;

  @Field()
  INT: number;

  @Field()
  DEX: number;

  @Field()
  LUK: number;
}
